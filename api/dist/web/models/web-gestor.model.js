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
exports.WebGestor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const web_entity_1 = require("../web.entity");
let WebGestor = class WebGestor extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], WebGestor.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT.UNSIGNED,
        allowNull: false,
    }),
    sequelize_typescript_1.ForeignKey(() => web_entity_1.Web),
    __metadata("design:type", Number)
], WebGestor.prototype, "web_id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT.UNSIGNED,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], WebGestor.prototype, "gestor_id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 2),
    }),
    __metadata("design:type", Number)
], WebGestor.prototype, "precio", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(3),
    }),
    __metadata("design:type", String)
], WebGestor.prototype, "divisa", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], WebGestor.prototype, "gambling", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], WebGestor.prototype, "comentarios", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: "created_at",
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], WebGestor.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: "updated_at",
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], WebGestor.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => web_entity_1.Web, { foreignKey: "web_id" }),
    __metadata("design:type", web_entity_1.Web)
], WebGestor.prototype, "web", void 0);
WebGestor = __decorate([
    sequelize_typescript_1.Table({
        tableName: "web_gestor"
    })
], WebGestor);
exports.WebGestor = WebGestor;
//# sourceMappingURL=web-gestor.model.js.map