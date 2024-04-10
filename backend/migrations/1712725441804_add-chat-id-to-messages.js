exports.up = (pgm) => {
  pgm.addColumn('messages', {
    chat_id: {
      type: 'integer',
      notNull: true,
      references: 'chats(id)'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('messages', ['chat_id']);
};
