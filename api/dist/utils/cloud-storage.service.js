"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudStorageService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const fs = require("fs");
const mimeType = require("mime-types");
const getS3 = () => {
    const spacesEndpoint = new AWS.Endpoint(process.env.DIGITAL_OCEAN_ENPOINT);
    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    return s3;
};
let CloudStorageService = class CloudStorageService {
    async upload(key, filePath, removeFile = false) {
        return new Promise((resolve, reject) => {
            try {
                const s3 = getS3();
                const fileData = fs.readFileSync(filePath);
                const params = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: key,
                    ACL: 'public-read',
                    Body: fileData,
                    ContentType: mimeType.lookup(filePath),
                };
                s3.upload(params, function (s3Err, data) {
                    if (s3Err) {
                        reject("error uploading file");
                    }
                    if (removeFile === true) {
                        fs.unlinkSync(filePath);
                    }
                    resolve(data['Location']);
                });
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
};
CloudStorageService = __decorate([
    common_1.Injectable()
], CloudStorageService);
exports.CloudStorageService = CloudStorageService;
//# sourceMappingURL=cloud-storage.service.js.map