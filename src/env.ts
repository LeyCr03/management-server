import { envsafe, port, str } from 'envsafe';

export const env = envsafe({
  JWT_SECRET: str({
    default: 'JWT_SECRET',
  }),
  JWT_REFRESH_SECRET: str({
    default: 'JWT_REFRESH_SECRET'
  }),
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'production',
    devDefault: 'development',
  }),
  DB_PORT: port({
    default: 5433, 
    devDefault: 5433,
  }),
  DB_USER: str({
    default: 'root', 
    devDefault: 'root',
  }),
  DB_PASSWORD: str({
    default: 'password', 
    devDefault: 'password',
  }),
  DB_HOST: str({
    default: 'localhost', 
    devDefault: 'localhost',
  }),
  DB_NAME: str({
    default: 'poll-my-choice', 
    devDefault: 'poll-my-choice',
  }),
});