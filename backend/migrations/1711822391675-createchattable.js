exports.up = (pgm) => {
  pgm.createType('chat_type', ['single', 'multi', 'channel']);

  pgm.createTable('chats', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    datetime: {
      type: 'timestamp',
      default: pgm.func('current_timestamp')
    },
    type: {
      type: 'chat_type',
      notNull: true
    },
    pin_message: {
      type: 'integer'
    },
    name: {
      type: 'varchar(100)',
      notNull: true
    },
    avatar: {
      type: 'text'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('chats');
  pgm.dropType('chat_type');
};