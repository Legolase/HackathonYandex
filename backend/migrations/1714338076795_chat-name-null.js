exports.up = (pgm) => {
  pgm.alterColumn('chats', 'name', {
    notNull: false
  });
};

exports.down = (pgm) => {
  pgm.alterColumn('chats', 'name', {
    notNull: true
  });
};
