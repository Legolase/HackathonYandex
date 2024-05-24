/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('chats_users', {
        id: {
            type: 'varchar(36)',
            notNull: true,
            primaryKey: true
        },
        chat_id: {
            type: 'varchar(36)',
            notNull: true,
            references: 'chats(id)'
        },
        user_id: {
            type: 'varchar(36)',
            notNull: true,
            references: 'users(id)'
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('chats_users');
};
