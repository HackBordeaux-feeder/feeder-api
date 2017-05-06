
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary().index()
      table.string('user_name', 64).unique().index()
      table.string('password', 256)
      table.string('email', 256)
      table.timestamps(true, true)
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE IF EXISTS users CASCADE'),
  ])
};
