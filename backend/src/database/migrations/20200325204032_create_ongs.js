
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name');
        table.string('email');
        table.string('whatsapp');
        table.string('city');
        table.string('uf');
        table.timestamps(true, true);//Cria essas duas coluna -> `created_at` datetime, `updated_at` datetime
    })
};

exports.down = function(knex) {
    return   knex.schema.dropTable('ongs');
};
