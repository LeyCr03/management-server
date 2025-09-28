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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePollDto = exports.CreatePollDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreatePollDto {
    userId;
    header;
    description;
    image;
    choices;
    created_at;
    expiration;
    topic;
    isArchived;
}
exports.CreatePollDto = CreatePollDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID',
        example: 'user-id-1'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePollDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Header',
        example: 'Nigth dinner'
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePollDto.prototype, "header", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Poll description',
        example: 'Which of these meals you recommend for Sant Valentine Day'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePollDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Poll Image Url',
        example: 'https://example.com/image2.jpg'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePollDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Poll Choices',
        example: ['Pizza', 'Tacos', 'Rice', 'Puddin'],
        type: [String]
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePollDto.prototype, "choices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-05-26',
        description: 'Creation date'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], CreatePollDto.prototype, "created_at", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-06-26',
        description: 'Expiration date'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], CreatePollDto.prototype, "expiration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Dinner',
        description: 'Get the topics that better suit your poll'
    }),
    __metadata("design:type", String)
], CreatePollDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Archive your poll to consult it latter',
        example: false,
        default: false
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePollDto.prototype, "isArchived", void 0);
class UpdatePollDto {
    isArchived;
    expiration;
}
exports.UpdatePollDto = UpdatePollDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Archive your poll and consult it latter',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdatePollDto.prototype, "isArchived", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-06-26',
        description: 'Expiration date'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Object)
], UpdatePollDto.prototype, "expiration", void 0);
//# sourceMappingURL=poll.dto.js.map