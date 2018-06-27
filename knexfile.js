require('dotenv').config();

module.exports.knex = require('knex')({
  client: 'pg',
  connection: `${process.env.PG_CONNECTION_STRING}_${process.env.ENV_NAME}`,
  searchPath: ['knex', 'public'],
  migrations: {
    directory: `${__dirname}/db/${process.env.ENV_NAME}`
  },
  seeds: {
    directory: `${__dirname}/db/seeds/${process.env.ENV_NAME}`
  }
});
