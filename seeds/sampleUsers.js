
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { user_name: 'pep', password: '', email: 'pepjo26@gmail.com' },
        { user_name: 'hacalox', password: '', email: 'hector@gmail.com' },
        { user_name: 'dani', password: '', email: 'dani@gmail.com' },
        { user_name: 'seraco', password: '', email: 'seraco@hotmail.com' },
      ]);
    });
};
