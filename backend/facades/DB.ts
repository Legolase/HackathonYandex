import {db} from "../index";
import {DataValue} from "../types/DataValue";


export class DB {
    constructor() {
    }

    async selectOne(table: string, where: object): Promise<Record<string, any>> {
        try {
            let {where_query, values} = this.generateValues(where);
            let query = `SELECT *
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'}
                         LIMIT 1`;
            return await db.oneOrNone(query, values);
        } catch (e) {
            console.error(e);
            return {};
        }
    }

    async selectAll(table: string, where: object = {}): Promise<Record<string, any>[]> {
        try {
            let {where_query, values} = this.generateValues(where);
            if (Array.isArray(where)) {
                [where_query, values] = where;
            }
            let query = `SELECT *
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'}`;
            return await db.any(query, values);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    private generateValues(where: object, start: number = 0, separator: string = 'AND ') {
        let where_query = '';
        const values = [];
        for (const [key, value] of Object.entries(where)) {
            if (key === 'order') {
                where_query += `ORDER BY ${value[0]} ${value[1]}`;
            } else if (key === 'like') {
                where_query += `${value[0]} ILIKE "%${value[1]}%" `;
            } else {
                if (where_query !== '') {
                    where_query += separator;
                }
                where_query += `${key} = $${start + values.length + 1} `;
                values.push(value);
            }
        }
        return {where_query, values};
    }

    async insert(table: string, fields: Record<string, any> = {}): Promise<Record<string, DataValue> | null> {
        try {
            const keys = Object.keys(fields).filter(key => fields[key] !== undefined);
            const values = Object.values(fields).filter(value => value !== undefined);

            const query = `INSERT INTO ${table} (${keys.join(', ')})
                           VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')})
                           RETURNING *`;
            return await db.one(query, values);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async update(table: string, search_fields: object, fields: object = {}): Promise<Record<string, any> | null> {
        try {
            const {where_query: update_query, values: update_values} = this.generateValues(fields, 0, ',');
            const {
                where_query: search_query,
                values: search_values
            } = this.generateValues(search_fields, update_values.length);

            const query = `UPDATE ${table}
                           SET ${update_query}
                           WHERE ${search_query}
                           RETURNING *`;
            return await db.one(query, [...update_values, ...search_values]);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async delete(table: string, where: object): Promise<null> {
        try {
            let {where_query, values} = this.generateValues(where);
            let query = `DELETE
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'} LIMIT 1`;
            return await db.none(query, values);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async join(select: string, from: string, join_table: string, on: string, where: object | Array<DataValue>): Promise<Record<string, any>[]> {
        try {
            let {where_query, values} = this.generateValues(where);
            if (Array.isArray(where)) {
                [where_query, values] = where;
            }
            let query = `SELECT ${select}
                         FROM ${from}
                                  JOIN ${join_table} ON ${on}
                         WHERE ${where_query ? where_query : true}`;
            return await db.any(query, values);
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}