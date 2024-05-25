/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('contacts', {
        id: {
            type: 'varchar(36)',
            notNull: true,
            primaryKey: true
        },
        user_id: {
            type: 'varchar(36)',
            notNull: true,
            references: 'users(id)'
        },
        contact_user_id: {
            type: 'varchar(36)',
            notNull: true,
            references: 'users(id)'
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('contacts');
};
