// Update with your config settings.

const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv') // eslint-disable-line

// Read the .env file to get the client secret
let env = {}
try {
  const envFile = fs.readFileSync(path.join(__dirname, '.env'), { encoding: 'utf8' })
  env = dotenv.parse(envFile)
} catch (e) {
  console.log('.env file not found')
}

module.exports = {

  development: {
    client: 'pg',
    version: '9.5',
    connection: env.DATABASEURL || process.env.DATABASEURL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    version: '9.5',
    connection: env.DATABASEURL || process.env.DATABASEURL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
