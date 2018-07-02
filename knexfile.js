require('dotenv').config();

module.exports = {
  live: {
    client: 'pg',
    connection: `${process.env.PG_CONNECTION_STRING}_live`,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/live`
    }
  },
  development: {
    client: 'pg',
    connection: `${process.env.PG_CONNECTION_STRING}_development`,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/dev`
    }
  },
  test: {
    client: 'pg',
    connection: `${process.env.PG_CONNECTION_STRING}_test`,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds/test`
    }
  }
};

