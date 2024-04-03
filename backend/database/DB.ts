const pgp = require('pg-promise')();

export class DB {
    private db;

    constructor() {
        this.db = pgp(process.env.DATABASE_URL);
    }


    async selectOne(table: string, where: object = {}): Promise<object | null> {
        try {
            let where_query = '';
            for (const [key, value] of Object.entries(where)) {
                where_query += `${key} ${value}`;
            }
            let query = `SELECT *
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'} LIMIT 1`;
            return await this.db.oneOrNone(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async selectAll(table: string, where: object = {}): Promise<object | null> {
        try {
            let where_query = '';
            for (const [key, value] of Object.entries(where)) {
                where_query += `${key} ${value}`;
            }
            let query = `SELECT *
                         FROM ${table}
                         WHERE ${where_query ? where_query : 'true'}`;
            return await this.db.any(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async insert(table: string, fields: object = {}): Promise<object | null> {
        try {
            let query = `INSERT INTO ${table} (${Object.keys(fields)})
                         VALUES (${Object.values(fields)}) RETURNING *`;
            console.log(query);
            return await this.db.one(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async update(table: string, search_fields: object, fields: object = {}): Promise<object | null> {
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
            return await this.db.one(query);
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}