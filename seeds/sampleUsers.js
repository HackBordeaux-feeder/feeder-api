
const sha256 = require('sha256')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_name: 'pep', password: sha256.x2('peppass'), email: 'pepjo26@gmail.com' },
        { user_name: 'hacalox', password: sha256.x2('hacaloxpass'), email: 'hector@gmail.com' },
        { user_name: 'dani', password: sha256.x2('danipass'), email: 'dani@gmail.com' },
        { user_name: 'seraco', password: sha256.x2('seracopass'), email: 'seraco@hotmail.com' },
      ]);
    });
};
