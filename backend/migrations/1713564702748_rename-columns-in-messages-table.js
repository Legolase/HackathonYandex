/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createType('message_type', ['info', 'text', 'image', 'video', 'link', 'document', 'resend']);
  pgm.renameColumn('messages', 'text', 'value');
  pgm.renameColumn('messages', 'from', 'user_id');
  pgm.addColumn('messages', {
    type: {
      type: 'message_type',
      notNull: true
    }
  });
};

exports.down = pgm => {
  pgm.renameColumn('messages', 'value', 'text');
  pgm.renameColumn('messages', 'user_id', 'from');
  pgm.dropColumn('messages', 'type');
  pgm.dropType('message_type');
};
