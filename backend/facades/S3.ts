import EasyYandexS3 from "easy-yandex-s3";
import {S3 as AwsS3} from "aws-sdk";

export class S3 {
    private worker: EasyYandexS3;

    constructor(accessKeyId: string = '', secretAccessKey: string = '', Bucket: string = '') {
        if (!accessKeyId || !secretAccessKey || !Bucket) throw new Error('Can not initialize S3');
        this.worker = new EasyYandexS3({
            auth: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
            Bucket: Bucket,
            debug: false,
        });
    }

    async uploadFile(fileBuffer: Buffer, route: string): Promise<AwsS3.ManagedUpload.SendData> {
        let result = await this.worker.Upload({buffer: fileBuffer}, route);
        if (!result) throw new Error('Can not upload file!');
        if (Array.isArray(result)) result = result[0];
        return result;
    }
    async uploadFiles(fileBuffers: Buffer[], route: string): Promise<AwsS3.ManagedUpload.SendData[]> {
        let result = await this.worker.Upload(fileBuffers.map((fileBuffer) => {
            return {buffer: fileBuffer}
        }), route);
        if (!result) throw new Error('Can not upload file!');
        if (!Array.isArray(result)) result = [result];
        return result;
    }
}