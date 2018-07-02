const knex = require('../db/knex.js');

const documents = () => knex('documents');

const documentsCreate = async doc => documents().insert(doc, 'id').catch((err) => { throw err; });

const documentsReadById = async id => documents().where('id', id).first().catch((err) => { throw err; });

const documentsRead = async () => documents().select().catch((err) => { throw err; });

const documentsUpdate = async (id, newDocObject) => documents().where('id', id).update(newDocObject).catch((err) => { throw err; });

const documentsDelete = async id => documents().where('id', id).del().catch((err) => { throw err; });

module.exports = {
  documentsCreate,
  documentsReadById,
  documentsRead,
  documentsUpdate,
  documentsDelete
};
