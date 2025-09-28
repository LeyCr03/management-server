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
    default: 5432, 
    devDefault: 5434,
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
    default: 'subscription-manager', 
    devDefault: 'subscription-manager',
  }),
});