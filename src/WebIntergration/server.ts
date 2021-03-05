import fastify, { FastifyReply, FastifyRequest } from 'fastify';
// import middie from 'middie';
// import type { NextHandleFunction } from 'connect';
import { RouteGenericInterface } from 'fastify/types/route';
import { Server, IncomingMessage, ServerResponse } from 'http';
import cookieReader from 'fastify-cookie';
import renderPlugin from 'point-of-view';
import pug from 'pug';
import formbodyPraser from 'fastify-formbody';
import { encryptPassword } from './encryptPassword';
import { IUserStorage } from '../types';

const createServer = (options: {
  config: { adminPassword: string };
  usersStorage: IUserStorage;
}) => {
  const server = fastify();

  server.register(cookieReader);
  server.register(formbodyPraser);
  server.register(renderPlugin, {
    engine: {
      pug,
    },
    root: __dirname,
  });

  const isAdmin = (
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
  ): boolean => request.cookies.auth === encryptPassword(options.config.adminPassword);
  const checkAdminAuthMiddleware = (
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>,
  ) => {
    if (!request.cookies.auth) {
      return reply.status(401).send();
    }
    if (request.cookies.auth !== encryptPassword(options.config.adminPassword)) {
      return reply.status(403).send();
    }

    return Promise.resolve();
  };
  const redirectToLoginUiMiddleware = (
    request: FastifyRequest<RouteGenericInterface, Server, IncomingMessage>,
    reply: FastifyReply<Server, IncomingMessage, ServerResponse, RouteGenericInterface, unknown>,
  ) => {
    if (!request.cookies.auth) {
      return reply.redirect('/ui');
    }
    if (request.cookies.auth !== encryptPassword(options.config.adminPassword)) {
      return reply.redirect('/ui');
    }

    return Promise.resolve();
  };
  // server.register(middie);
  // server.use(checkAdminAuthMiddleware);

  // TODO: pagination
  server.get(
    '/api/users/:userId',
    { preHandler: checkAdminAuthMiddleware },
    async (request, reply) => {
      // @ts-ignore
      const user = await options.usersStorage.getUser(request.params.userId);
      if (!user) {
        return reply.status(404).send();
      }
      return reply.send(user);
    },
  );
  server.get('/api/users', { preHandler: checkAdminAuthMiddleware }, async (request, reply) => {
    const users = await options.usersStorage.getUsers();
    reply.send(users);
  });

  server.put(
    '/api/users/:userId',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            gitlabUsername: { type: 'string' },
          },
        },
      },
      preHandler: checkAdminAuthMiddleware,
    },
    async (request, reply) => {
      const user = await options.usersStorage.getUser((request.params as any).userId);
      if (!user) {
        return reply.status(404).send();
      }

      if (user.gitlabUsername !== (request.body as any).gitlabUsername) {
        return reply.status(400).send();
      }

      await options.usersStorage.saveUser(request.body as any);
      return reply.status(200).send();
    },
  );

  server.post(
    '/api/loginAsAdmin',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            password: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      if ((request.body as any).password !== options.config.adminPassword) {
        console.log(options.config.adminPassword);
        return reply.status(400).send();
      }

      return reply
        .setCookie('auth', encryptPassword(options.config.adminPassword), {
          maxAge: 60 * 60 * 24,
          path: '/',
        })
        .send();
    },
  );

  server.post('/api/logoutAsAdmin', {}, async (request, reply) => {
    return reply.clearCookie('auth').send();
  });

  server.post(
    '/api/users',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            gitlabUsername: { type: 'string' },
          },
        },
      },
      preHandler: checkAdminAuthMiddleware,
    },
    async (request, reply) => {
      const user = await options.usersStorage.getUser((request.body as any).gitlabUsername);
      if (user) {
        return reply.status(409).send();
      }

      await options.usersStorage.saveUser(request.body as any);
      return reply.status(200).send();
    },
  );

  server.get('/ui/users', { preHandler: redirectToLoginUiMiddleware }, async (request, reply) => {
    const users = await options.usersStorage.getUsers();
    return reply.view('/templates/users.pug', { isAdmin: isAdmin(request), users });
  });

  server.get(
    '/ui/users/:userId',
    { preHandler: redirectToLoginUiMiddleware },
    async (request, reply) => {
      const user = await options.usersStorage.getUser((request.params as any).userId);
      if (!user) {
        return reply.redirect('/ui/users');
      }

      return reply.view('/templates/user.pug', {
        gitlabUsername: user.gitlabUsername,
        telegramChatId: user.telegramChatId,
      });
    },
  );

  server.get('/ui', async (request, reply) => {
    return reply.view('/templates/index.pug', {
      isAdmin: isAdmin(request),
    });
  });

  return server;
};

export { createServer };
