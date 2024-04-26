// @ts-ignore
import {generateSync} from "identicon";

export class Identicon {
    static generateImage(id: string, size: number = 150) {
        return generateSync({id: id, size: size})
    }
}