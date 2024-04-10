/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('chats_users', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    chat_id: {
      type: 'integer',
      notNull: true,
      references: 'chats(id)'
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users(id)'
    }
  });
};

exports.down = pgm => {
  pgm.dropTable('chats_users');
};
