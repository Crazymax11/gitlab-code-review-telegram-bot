import { createServer } from './server';
import * as fixtures from './fixtures';
import { createUsersStorageMock } from '../UsersStorage/UserStorage.mock';

describe('WebCommandsHandler', () => {
  const storage = createUsersStorageMock();
  storage.getUsers = () => Promise.resolve(fixtures.users);

  const server = createServer({
    config: { adminPassword: fixtures.password },
    usersStorage: storage,
  });
  describe('api', () => {
    describe('POST /api/loginAsAdmin', () => {
      it('возвращает 400 если пароль не подходит', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/loginAsAdmin',
          payload: { password: '1234' },
        });

        expect(res.statusCode).toEqual(400);
      });
      it('возвращает 400 если payload кривой', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/loginAsAdmin',
        });

        expect(res.statusCode).toEqual(400);
      });
      it('устанавливает куку на день если логин подходит', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/loginAsAdmin',
          payload: { password: fixtures.password },
        });

        expect(res.statusCode).toEqual(200);

        expect(res.cookies).toContainEqual({
          maxAge: 86400,
          name: 'auth',
          value: fixtures.AUTH_COOKIE,
          path: '/',
        });
      });
    });
    describe('POST /api/logoutAsAdmin', () => {
      it('стирает куку', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/logoutAsAdmin',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });

        expect(res.cookies).toContainEqual(
          expect.objectContaining({
            name: 'auth',
            value: '',
          }),
        );
      });
    });
    describe('GET /api/users', () => {
      it('возвращает 403 если не админ', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/api/users',
          cookies: { auth: '123' },
        });
        expect(res.statusCode).toEqual(403);
      });
      it('возвращает 401 если нет аутхкуки', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/api/users',
        });
        expect(res.statusCode).toEqual(401);
      });
      it('возвращает список пользователей', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/api/users',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });
        expect(JSON.parse(res.body)).toEqual(fixtures.users);
      });
    });

    describe('GET /api/users/:userId', () => {
      it('возвращает 403 если не админ', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/api/users/1',
          cookies: { auth: '123' },
        });
        expect(res.statusCode).toEqual(403);
      });
      it('возвращает 401 если нет аутхкуки', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/api/users/1',
        });
        expect(res.statusCode).toEqual(401);
      });
      it('возвращает инфу о пользователе', async () => {
        storage.getUser = jest.fn(() => Promise.resolve(fixtures.users[0]));
        const res = await server.inject({
          method: 'GET',
          url: '/api/users/user1',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });
        expect(JSON.parse(res.body)).toEqual(fixtures.users[0]);
        expect(storage.getUser).toHaveBeenCalledWith('user1');
      });
      it('возвращает 404 если такого пользователя нет', async () => {
        storage.getUser = jest.fn(() => Promise.resolve(undefined));

        const res = await server.inject({
          method: 'GET',
          url: '/api/users/1',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });

        expect(res.statusCode).toEqual(404);
      });
    });

    describe('PUT /api/users/:userId', () => {
      it('возвращает 403 если не админ', async () => {
        const res = await server.inject({
          method: 'PUT',
          url: '/api/users/1',
          cookies: { auth: '123' },
          payload: {
            gitlabUsername: 'user3',
            telegramChatId: 3,
          },
        });
        expect(res.statusCode).toEqual(403);
      });
      it('возвращает 401 если нет аутхкуки', async () => {
        const res = await server.inject({
          method: 'PUT',
          url: '/api/users/1',
          payload: {
            gitlabUsername: 'user3',
            telegramChatId: 3,
          },
        });
        expect(res.statusCode).toEqual(401);
      });
      it('обновляет инфу о пользователе', async () => {
        storage.getUser = () =>
          Promise.resolve({
            gitlabUsername: 'user3',
            telegramChatId: 3,
          });
        const res = await server.inject({
          method: 'PUT',
          url: '/api/users/user3',
          cookies: { auth: fixtures.AUTH_COOKIE },
          payload: {
            gitlabUsername: 'user3',
            telegramChatId: 33,
          },
        });
        expect(res.statusCode).toEqual(200);
        expect(storage.saveUser).toHaveBeenCalledWith({
          gitlabUsername: 'user3',
          telegramChatId: 33,
        });
      });
      it('возвращает 404 если такого пользователя нет', async () => {
        storage.getUser = () => Promise.resolve(undefined);
        const res = await server.inject({
          method: 'PUT',
          url: '/api/users/3',
          cookies: { auth: fixtures.AUTH_COOKIE },
          payload: {
            gitlabUsername: 'user3',
            telegramChatId: 3,
          },
        });
        expect(res.statusCode).toEqual(404);
      });
      it('возвращает 400 если неверный формат данных', async () => {
        const res = await server.inject({
          method: 'PUT',
          url: '/api/users/1',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });
        expect(res.statusCode).toEqual(400);
      });
    });

    describe('POST /api/users', () => {
      it('возвращает 403 если не админ', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/users',
          cookies: { auth: '123' },
          payload: {
            gitlabUsername: 'user3',
            telegramChatId: 3,
          },
        });
        expect(res.statusCode).toEqual(403);
      });
      it('возвращает 401 если нет аутхкуки', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/users',
          payload: {
            gitlabUsername: 'user3',
            telegramChatId: 3,
          },
        });
        expect(res.statusCode).toEqual(401);
      });
      it('создает пользователя', async () => {
        const payload = {
          gitlabUsername: 'user3',
          telegramChatId: 3,
        };
        const res = await server.inject({
          method: 'POST',
          url: '/api/users',
          cookies: { auth: fixtures.AUTH_COOKIE },
          payload,
        });
        expect(res.statusCode).toEqual(200);
        expect(storage.saveUser).toHaveBeenCalledWith(payload);
      });
      it('возвращает 409 если такой пользователь уже есть', async () => {
        storage.getUser = () => Promise.resolve(fixtures.users[0]);
        const res = await server.inject({
          method: 'POST',
          url: '/api/users',
          cookies: { auth: fixtures.AUTH_COOKIE },
          payload: fixtures.users[0],
        });
        expect(res.statusCode).toEqual(409);
      });
      it('возвращает 400 если неверный формат данных', async () => {
        const res = await server.inject({
          method: 'POST',
          url: '/api/users',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });
        expect(res.statusCode).toEqual(400);
      });
    });
  });

  describe('ui', () => {
    it('GET /ui должен отдать контент', async () => {
      const res = await server.inject({
        method: 'GET',
        url: '/ui',
        cookies: { auth: fixtures.AUTH_COOKIE },
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toContain('body');
    });
    describe('GET /ui/users должен отдать контент', () => {
      it('должен отдать контент если админ', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/ui/users',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toContain('body');
      });
      it('должен редиректнуть на /ui если неадмин', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/ui/users',
          cookies: { auth: '123' },
        });
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/ui');
      });
    });
    describe('GET /ui/users/:userId', () => {
      it('должен отдать контент если админ', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/ui/users/1',
          cookies: { auth: fixtures.AUTH_COOKIE },
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toContain('body');
      });
      it('должен редиректнуть на /ui если неадмин', async () => {
        const res = await server.inject({
          method: 'GET',
          url: '/ui/users',
          cookies: { auth: '123' },
        });
        expect(res.statusCode).toEqual(302);
        expect(res.headers.location).toEqual('/ui');
      });
    });
  });
});
