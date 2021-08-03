"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFileName = void 0;
const path_1 = require("path");
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = path_1.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, `${name}-${uniqueSuffix}${fileExtName}`);
};
exports.editFileName = editFileName;
//# sourceMappingURL=file-upload.js.map