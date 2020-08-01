module.exports = {
  extends: [
    'eslint-config-crazymax',
    'eslint-config-crazymax/typescript',
    'eslint-config-crazymax/jest',
  ],
  rules: {
    'no-console': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
