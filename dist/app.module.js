"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const env_1 = require("./env");
const user_entity_1 = require("./entity/user.entity");
const user_module_1 = require("./module/user.module");
const auth_module_1 = require("./auth/auth.module");
const account_entity_1 = require("./entity/account.entity");
const payment_entity_1 = require("./entity/payment.entity");
const entry_entity_1 = require("./entity/entry.entity");
const payment_module_1 = require("./module/payment.module");
const entry_module_1 = require("./module/entry.module");
const account_module_1 = require("./module/account.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: "postgres",
                    host: env_1.env.DB_HOST,
                    port: env_1.env.DB_PORT,
                    username: env_1.env.DB_USER,
                    password: env_1.env.DB_PASSWORD,
                    database: env_1.env.DB_NAME,
                    migrationsRun: env_1.env.NODE_ENV === 'development',
                    synchronize: true,
                    logging: env_1.env.NODE_ENV === 'development',
                    entities: [__dirname + '/entity/*.entity{.ts,.js}'],
                })
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, account_entity_1.Account, payment_entity_1.Payment, entry_entity_1.Entry]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            payment_module_1.PaymentModule,
            entry_module_1.EntryModule,
            account_module_1.AccountModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map