import {DB} from "../database/DB";
import {DataValue} from "../types/DataValue";

export class Model {
    table: string = '';
    private db;

    constructor(fields: Record<string, DataValue> = {}) {
        this.db = new DB();
        for (const [key, value] of Object.entries(fields)) {
            (this as Record<string, any>)[key] = value;
        }
    }

    async getList(): Promise<Model[] | undefined> {
        let data: Record<string, DataValue>[] | null = await this.db.selectAll(this.table);
        return data?.map((item: Record<string, DataValue>) => {
            return new (this.constructor as new (item: Record<string, DataValue>) => Model)(item);
        });
    }

}