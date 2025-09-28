"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const envsafe_1 = require("envsafe");
exports.env = (0, envsafe_1.envsafe)({
    JWT_SECRET: (0, envsafe_1.str)({
        default: 'JWT_SECRET',
    }),
    JWT_REFRESH_SECRET: (0, envsafe_1.str)({
        default: 'JWT_REFRESH_SECRET'
    }),
    NODE_ENV: (0, envsafe_1.str)({
        choices: ['development', 'production', 'test'],
        default: 'production',
        devDefault: 'development',
    }),
    DB_PORT: (0, envsafe_1.port)({
        default: 5432,
        devDefault: 5434,
    }),
    DB_USER: (0, envsafe_1.str)({
        default: 'root',
        devDefault: 'root',
    }),
    DB_PASSWORD: (0, envsafe_1.str)({
        default: 'password',
        devDefault: 'password',
    }),
    DB_HOST: (0, envsafe_1.str)({
        default: 'localhost',
        devDefault: 'localhost',
    }),
    DB_NAME: (0, envsafe_1.str)({
        default: 'subscription-manager',
        devDefault: 'subscription-manager',
    }),
});
//# sourceMappingURL=env.js.map