require('dotenv').config();

const env = process.env.ENV_NAME || process.env.NOOE_ENV;

module.exports = {
  client: 'pg',
  connection: `${process.env.PG_CONNECTION_STRING}_${env}`,
  searchPath: ['knex', 'public'],
  migrations: {
    directory: `${__dirname}/db/migrations`
  },
  seeds: {
    directory: `${__dirname}/db/seeds/${env}`
  }
};

