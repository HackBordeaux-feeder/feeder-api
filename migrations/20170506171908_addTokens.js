
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tokens', (table) => {
      table.string('token', 256).primary().index()
      table.integer('user')
      table.timestamps(true, true)
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE IF EXISTS tokens CASCADE'),
  ])
}
