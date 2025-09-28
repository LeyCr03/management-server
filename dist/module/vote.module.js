"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const poll_entity_1 = require("../entity/poll.entity");
const user_module_1 = require("./user.module");
const vote_entity_1 = require("../entity/vote.entity");
const vote_controller_1 = require("../controller/vote.controller");
const vote_service_1 = require("../service/vote.service");
let VoteModule = class VoteModule {
};
exports.VoteModule = VoteModule;
exports.VoteModule = VoteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, poll_entity_1.Poll, vote_entity_1.Vote]),
        ],
        controllers: [vote_controller_1.VoteController],
        providers: [vote_service_1.VoteService],
    })
], VoteModule);
//# sourceMappingURL=vote.module.js.map