import {s3} from "../index";
import {UploadedFile} from "express-fileupload";

export const ServiceController = {
    async uploadFile(file: UploadedFile) {
        let res = {
            link: '',
            name: ''
        };
        res.link = (await s3.uploadFile(file.data, '/uploads/')).Location;
        res.name = file.name;
        return res;
    }
}