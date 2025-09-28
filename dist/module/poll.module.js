"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const poll_entity_1 = require("../entity/poll.entity");
const sub_entity_1 = require("../entity/sub.entity");
const poll_service_1 = require("../service/poll.service");
const topic_entity_1 = require("../entity/topic.entity");
const poll_controller_1 = require("../controller/poll.controller");
const topic_module_1 = require("./topic.module");
const vote_entity_1 = require("../entity/vote.entity");
const choices_entity_1 = require("../entity/choices.entity");
const choices_module_1 = require("./choices.module");
const user_module_1 = require("./user.module");
const user_service_1 = require("../service/user.service");
const choices_service_1 = require("../service/choices.service");
let PollModule = class PollModule {
};
exports.PollModule = PollModule;
exports.PollModule = PollModule = __decorate([
    (0, common_1.Module)({
        imports: [
            topic_module_1.TopicModule,
            choices_module_1.ChoiceModule,
            user_module_1.UserModule,
            choices_module_1.ChoiceModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, poll_entity_1.Poll, sub_entity_1.Sub, vote_entity_1.Vote, choices_entity_1.Choice, topic_entity_1.Topic]),
        ],
        controllers: [poll_controller_1.PollController],
        providers: [poll_service_1.PollService, user_service_1.UserService, choices_service_1.ChoiceService],
        exports: [poll_service_1.PollService]
    })
], PollModule);
//# sourceMappingURL=poll.module.js.map