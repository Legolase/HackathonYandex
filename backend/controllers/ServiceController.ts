import {s3} from "../index";
import {UploadedFile} from "express-fileupload";
import {Identicon} from "../facades/Identicon";
import {v4 as uuidv4} from "uuid";
import {Chat} from "../models/Chat";

export const ServiceController = {
    async uploadFile(file: UploadedFile) {
        let res = {
            link: '',
            name: ''
        };
        res.link = (await s3.uploadFile(file.data, '/uploads/')).Location;
        res.name = file.name;
        return res;
    },
    async generateImage(uid: string) {
        let fileBuffer = Identicon.generateImage(uid + uuidv4());
        let filePath = await s3.uploadFile(fileBuffer, '/generated/');
        return {
            link: filePath?.Location
        };
    }
}