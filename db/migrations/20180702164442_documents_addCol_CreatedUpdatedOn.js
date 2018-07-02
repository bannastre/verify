exports.up = knex => knex.schema.table('documents', (table) => {
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.table('documents', (table) => {
  table.dropColumn('created_at');
  table.dropColumn('updated_at');
});
