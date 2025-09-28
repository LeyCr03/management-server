"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const user_module_1 = require("../module/user.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const env_1 = require("../config/env");
const user_service_1 = require("../service/user.service");
const user_entity_1 = require("../entity/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const poll_entity_1 = require("../entity/poll.entity");
const local_startegy_1 = require("./strategies/local.startegy");
const jwt_refresh_startegy_1 = require("./strategies/jwt-refresh.startegy");
const sub_module_1 = require("../module/sub.module");
const sub_entity_1 = require("../entity/sub.entity");
const vote_module_1 = require("../module/vote.module");
const vote_entity_1 = require("../entity/vote.entity");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            sub_module_1.SubModule,
            passport_1.PassportModule,
            vote_module_1.VoteModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, vote_entity_1.Vote, poll_entity_1.Poll, sub_entity_1.Sub]),
            jwt_1.JwtModule.registerAsync({
                useFactory: async () => ({
                    secret: env_1.env.JWT_SECRET,
                    signOptions: { expiresIn: '15m' }
                }),
            }),
        ],
        providers: [
            user_service_1.UserService,
            auth_service_1.AuthService,
            local_startegy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            jwt_refresh_startegy_1.JwtRefreshStrategy,
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map