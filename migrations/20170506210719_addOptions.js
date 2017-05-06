
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('options', (table) => {
      table.increments('id').primary().index()
      table.integer('user_id').references('users.id')
      table.string('service', 256)
      table.string('option', 512)
      table.timestamps(true, true)
    }),
    knex.schema.table('users', function (table) {
      table.string('fb_username', 512)
      table.string('fb_password', 512)
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('DROP TABLE IF EXISTS options CASCADE'),
    knex.schema.table('users', function (table) {
      table.dropColumn('fb_username')
      table.dropColumn('fb_password')
    })
  ])
}
