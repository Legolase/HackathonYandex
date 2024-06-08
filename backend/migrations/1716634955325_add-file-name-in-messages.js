/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('messages', {
        file_name: {
            type: 'varchar(255)',
            notNull: false
        }
    });
};

exports.down = pgm => {
    pgm.dropColumn('messages', 'file_name');
};
