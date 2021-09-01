import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as mimeType from 'mime-types';

const getS3 = () => {
    const spacesEndpoint = new AWS.Endpoint(process.env.DIGITAL_OCEAN_ENPOINT);

    const s3 = new AWS.S3({
        endpoint: spacesEndpoint,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    return s3;
};

@Injectable()
export class CloudStorageService {
    async upload(key: string, filePath: string, removeFile = false): Promise<string> {
        return new Promise((resolve, reject) => {
            try {
                const s3 = getS3();

                const fileData: any = fs.readFileSync(filePath);

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


            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }
}
