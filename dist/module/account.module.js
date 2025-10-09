"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_controller_1 = require("../controller/account.controller");
const account_entity_1 = require("../entity/account.entity");
const account_service_1 = require("../service/account.service");
const entry_module_1 = require("./entry.module");
const payment_module_1 = require("./payment.module");
let AccountModule = class AccountModule {
};
exports.AccountModule = AccountModule;
exports.AccountModule = AccountModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([account_entity_1.Account]),
            entry_module_1.EntryModule,
            payment_module_1.PaymentModule
        ],
        controllers: [account_controller_1.AccountController],
        providers: [account_service_1.AccountService, common_1.Logger],
        exports: [account_service_1.AccountService]
    })
], AccountModule);
//# sourceMappingURL=account.module.js.map