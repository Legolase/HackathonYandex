exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    datetime_create: {
      type: 'timestamp',
      default: pgm.func('current_timestamp')
    },
    datetime_last_activity: {
      type: 'timestamp',
      default: pgm.func('current_timestamp')
    },
    name: {
      type: 'varchar(100)',
      notNull: true
    },
    login: {
      type: 'varchar(50)',
      notNull: true
    },
    email: {
      type: 'varchar(100)'
    },
    avatar: {
      type: 'text'
    }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
