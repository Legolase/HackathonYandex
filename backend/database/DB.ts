import {db} from "../index";
import {DataValue} from "../types/DataValue";


export class DB {
    constructor() {
    }

    async selectOne(table: string, where: object): Promise<Record<string, any>> {
        try {
            let where_query = '';
            for (const [key, value] of Object.entries(where)) {
                if (key === 'order') {
                    where_query += `ORDER BY ${value} `;
                } else {
                    if (where_query !== '') {
                        where_query += 'AND ';
                    }
                    where_query += `${key} ${value} `;
                }
            }
            let query = `SELECT *
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'} LIMIT 1`;
            return await db.oneOrNone(query);
        } catch (e) {
            console.error(e);
            return {};
        }
    }

    async selectAll(table: string, where: object = {}): Promise<Record<string, any>[] | null> {
        try {
            let where_query = '';
            for (const [key, value] of Object.entries(where)) {
                where_query += `${key} ${value}`;
            }
            let query = `SELECT *
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'}`;
            return await db.any(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async insert(table: string, fields: object = {}): Promise<Record<string, DataValue> | null> {
        try {
            let query = `INSERT INTO ${table} (${Object.keys(fields).map((item) => {
                return `"${item}"`
            })}) VALUES (${Object.values(fields).map((item) => {
                             return item ? `'${item}'` : 'NULL'
                         })}) RETURNING *`;
            return await db.one(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async update(table: string, search_fields: object, fields: object = {}): Promise<Record<string, any> | null> {
        try {
            let update_query = '';
            let search_query = '';
            for (const [key, value] of Object.entries(fields)) {
                update_query += `${key} = ${value}, `;
            }
            update_query = update_query.slice(0, -2);
            for (const [key, value] of Object.entries(search_fields)) {
                search_query += `${key} = ${value} AND `;
            }
            search_query = search_query.slice(0, -5);

            let query = `UPDATE ${table}
                         SET ${update_query}
                         WHERE ${search_query} RETURNING *`;
            return await db.one(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async delete(table: string, where: object): Promise<null> {
        try {
            let where_query = '';
            for (const [key, value] of Object.entries(where)) {
                where_query += `${key} ${value}`;
            }
            let query = `DELETE
                         FROM ${table}
                         WHERE ${where_query} LIMIT 1`;
            return await db.none(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}