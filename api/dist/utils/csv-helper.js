"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvHelperService = void 0;
const common_1 = require("@nestjs/common");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
let CsvHelperService = class CsvHelperService {
    async parse(file, options = {}) {
        var e_1, _a;
        const result = [];
        try {
            const stream = fs.createReadStream(path.resolve(__dirname, '../../', './public', file));
            const parser = stream
                .pipe(csv(Object.assign({}, options)));
            try {
                for (var parser_1 = __asyncValues(parser), parser_1_1; parser_1_1 = await parser_1.next(), !parser_1_1.done;) {
                    const record = parser_1_1.value;
                    result.push(record);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (parser_1_1 && !parser_1_1.done && (_a = parser_1.return)) await _a.call(parser_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        catch (e) {
            console.log(e);
        }
        return result;
    }
};
CsvHelperService = __decorate([
    common_1.Injectable()
], CsvHelperService);
exports.CsvHelperService = CsvHelperService;
//# sourceMappingURL=csv-helper.js.map