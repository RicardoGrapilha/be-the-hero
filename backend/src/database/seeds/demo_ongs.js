
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ongs').del()
    .then(function () {
      // Inserts seed entries
      return knex('ongs').insert([
        {id:'e182f32e',  name: 'APAD', email: 'contato@apad.com.br', whatsapp: '47000000000', city: 'Rio do Sul', uf: 'SC'},
        {id:'e182f33e',  name: 'APAD2', email: 'contato2@apad.com.br', whatsapp: '47000000001', city: 'Sul do Rio', uf: 'SC'},
      ]);
    });
};
