import {DB} from '../database/DB';
import {DataValue} from "../types/DataValue";

export abstract class Model {
    table: string = '';
    id: number | undefined;
    private db: DB;

    constructor(fields: Record<string, DataValue> = {}) {
        this.db = new DB();
        for (const [key, value] of Object.entries(fields)) {
            (this as Record<string, any>)[key] = value;
        }
    }

    async getList<T extends Model>(classConstructor: new (fields: Record<string, DataValue>) => T, params: object = {}): Promise<T[] | undefined> {
        let data: Record<string, DataValue>[] | null = await this.db.selectAll(this.table, params);
        return data?.map((item: Record<string, DataValue>) => {
            return new classConstructor(item);
        });
    }

    async getById<T extends Model>(id: string, classConstructor: new (fields: Record<string, DataValue>) => T): Promise<T | undefined> {
        let data: Record<string, any> = await this.db.selectOne(this.table, {id: '=' + id});
        if (data) {
            return new classConstructor(data);
        }
    }

    async getOne<T extends Model>(classConstructor: new (fields: Record<string, DataValue>) => T, params: object = {}): Promise<T | undefined> {
        let data: Record<string, any> = await this.db.selectOne(this.table, params);
        if (data) {
            return new classConstructor(data);
        }
    }

    async create<T extends Model>(classConstructor: new (fields: Record<string, DataValue>) => T) {
        let obj = this.getObject();
        return this.db.insert(this.table, obj).then((data) => {
            if (data) return new classConstructor(data);
        });
    }

    async update<T extends Model>(classConstructor: new (fields: Record<string, DataValue>) => T) {
        let obj = this.getObject();
        return this.db.update(this.table, {id: `id == ${this.id}`}, obj).then((data) => {
            if (data) return new classConstructor(data);
        });
    }

    abstract getObject(): object;
    abstract validate(obj: Record<string, any>): Promise<boolean>;
}