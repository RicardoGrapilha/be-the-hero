
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('incidents').del()
    .then(function () {
      // Inserts seed entries
      return knex('incidents').insert([
        {
        title: 'Cadelinha atropelada',
        description: 'A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas',
        value: 120.00,
        ong_id: 'e182f32e'
        },
        {
          title: 'Cadelinha atropelada 1',
          description: 'A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas',
          value: 120.00,
          ong_id: 'e182f32e'
        },
        {
          title: 'Cadelinha atropelada 3',
          description: 'A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas',
          value: 120.00,
          ong_id: 'e182f33e'
        },
        {
          title: 'Cadelinha atropelada 4',
          description: 'A cadelinha Jolie foi atropelada por um carro no bairro Santana e teve que passar por uma cirurgia às pressas',
          value: 120.00,
          ong_id: 'e182f33e'
        }
      ]);
    });
};
