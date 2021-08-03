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
exports.Web = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Web = class Web extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Web.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Web.prototype, "dominio", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: false,
    }),
    __metadata("design:type", Boolean)
], Web.prototype, "disponible", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Web.prototype, "comentarios", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Web.prototype, "pais", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Web.prototype, "idioma", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Web.prototype, "precio", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DECIMAL(8, 2),
    }),
    __metadata("design:type", Number)
], Web.prototype, "precio_venta", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Web.prototype, "tipo_contacto", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.STRING(3),
    }),
    __metadata("design:type", String)
], Web.prototype, "divisa", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Web.prototype, "id_gestor", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Web.prototype, "gambling", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Web.prototype, "imagen", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Web.prototype, "executed_cron_spy", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Web.prototype, "executed_secure_cron_spy", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Web.prototype, "fecha_upload", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column({
        field: "created_at",
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], Web.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column({
        field: "updated_at",
        type: sequelize_typescript_1.DataType.DATE
    }),
    __metadata("design:type", Date)
], Web.prototype, "updatedAt", void 0);
Web = __decorate([
    sequelize_typescript_1.Table({
        tableName: "web"
    })
], Web);
exports.Web = Web;
//# sourceMappingURL=web.entity.js.map