exports.up = (pgm) => {
  pgm.addColumn('users', {
    github_id: {
      type: 'integer',
      notNull: false,
    }
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('users', ['github_id']);
};