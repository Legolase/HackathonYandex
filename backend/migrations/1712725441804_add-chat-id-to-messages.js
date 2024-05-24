exports.up = (pgm) => {
  pgm.addColumn('messages', {
    chat_id: {
      type: 'varchar(36)',
      notNull: true,
      references: 'chats(id)'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('messages', ['chat_id']);
};
