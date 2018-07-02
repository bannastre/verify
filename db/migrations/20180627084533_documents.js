exports.up = knex => knex.schema.createTable('documents', (table) => {
  table.increments('id').primary();
  table.string('name').notNullable();
  table.string('hash').notNullable();
});

exports.down = knex => knex.schema.dropTable('documents');
