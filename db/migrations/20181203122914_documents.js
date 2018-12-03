exports.up = knex => knex.schema.table('documents', (table) => {
  table.string('documentId');
});

exports.down = knex => knex.schema.table('documents', (table) => {
  table.dropColumn('documentId');
});
