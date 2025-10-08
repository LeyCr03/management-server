"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntriesController = void 0;
const common_1 = require("@nestjs/common");
const entry_service_1 = require("../service/entry.service");
let EntriesController = class EntriesController {
    entryService;
    constructor(entryService) {
        this.entryService = entryService;
    }
    async delete(id) {
        return this.entryService.deleteEntry(id);
    }
    async create(id) {
        return this.entryService.createEntry(id);
    }
    async getEntries() {
        return this.entryService.getAllEntriesSinceLastMonths();
    }
    async getMonthlyEntries() {
        return this.entryService.getAllMonthlyEntries();
    }
};
exports.EntriesController = EntriesController;
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntriesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('entries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EntriesController.prototype, "getEntries", null);
__decorate([
    (0, common_1.Get)('monthly/entries'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EntriesController.prototype, "getMonthlyEntries", null);
exports.EntriesController = EntriesController = __decorate([
    (0, common_1.Controller)('api/entries'),
    __metadata("design:paramtypes", [entry_service_1.EntryService])
], EntriesController);
//# sourceMappingURL=entry.controller.js.map