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
const env_1 = require("./config/env");
const user_entity_1 = require("./entity/user.entity");
const poll_entity_1 = require("./entity/poll.entity");
const sub_entity_1 = require("./entity/sub.entity");
const topic_entity_1 = require("./entity/topic.entity");
const comment_entity_1 = require("./entity/comment.entity");
const user_module_1 = require("./module/user.module");
const auth_module_1 = require("./auth/auth.module");
const comment_module_1 = require("./module/comment.module");
const poll_module_1 = require("./module/poll.module");
const topic_module_1 = require("./module/topic.module");
const sub_module_1 = require("./module/sub.module");
const vote_entity_1 = require("./entity/vote.entity");
const vote_module_1 = require("./module/vote.module");
const choices_entity_1 = require("./entity/choices.entity");
const choices_module_1 = require("./module/choices.module");
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
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, poll_entity_1.Poll, topic_entity_1.Topic, sub_entity_1.Sub, vote_entity_1.Vote, choices_entity_1.Choice, comment_entity_1.Comment]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            choices_module_1.ChoiceModule,
            comment_module_1.CommentModule,
            poll_module_1.PollModule,
            topic_module_1.TopicModule,
            sub_module_1.SubModule,
            vote_module_1.VoteModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map