exports.up = (pgm) => {
  pgm.createTable('messages', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    datetime: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    text: {
      type: 'text',
      notNull: true
    },
    "from": {
      type: 'integer',
      notNull: true,
      references: 'users(id)'
    },
    read: {
      type: 'boolean',
      notNull: true,
      default: false
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('messages');
};
