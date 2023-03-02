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
exports.Currency = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Currency = class Currency extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Currency.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Currency.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(3),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Currency.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(5),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Currency.prototype, "symbol", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "usd", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "usd_before", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "eur", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "eur_before", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "gbp", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "gbp_before", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "mxn", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 5),
    }),
    __metadata("design:type", Number)
], Currency.prototype, "mxn_before", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: "created_at",
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], Currency.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: "updated_at",
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], Currency.prototype, "updatedAt", void 0);
Currency = __decorate([
    sequelize_typescript_1.Table({
        tableName: "divisa"
    })
], Currency);
exports.Currency = Currency;
//# sourceMappingURL=currency.model.js.map