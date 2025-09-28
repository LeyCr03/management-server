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
exports.ChoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const choices_entity_1 = require("../entity/choices.entity");
const typeorm_2 = require("typeorm");
let ChoiceService = class ChoiceService {
    choiceRepository;
    constructor(choiceRepository) {
        this.choiceRepository = choiceRepository;
    }
    async findById(id) {
        return this.choiceRepository.findOne({ where: { id } });
    }
    async createChoice(content) {
        const choice = this.choiceRepository.create({
            content
        });
        await this.choiceRepository.save(choice);
        return choice;
    }
    async deleteChoice(id) {
        const choice = await this.findById(id);
        if (!choice) {
            throw new common_1.NotFoundException('User have not voted yet');
        }
        await this.choiceRepository.remove(choice);
        return { message: 'Vote deleted' };
    }
};
exports.ChoiceService = ChoiceService;
exports.ChoiceService = ChoiceService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(choices_entity_1.Choice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChoiceService);
//# sourceMappingURL=choices.service.js.map