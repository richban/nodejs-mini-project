import { createConnection, ConnectionOptions } from 'typeorm'
import { join } from 'path'

// tslint:disable-next-line:no-var-requires
const config = require('../src/config')

const Config = config.Config
const dbConfig = Config.db

if (!dbConfig) {
  // tslint:disable-next-line:no-console
  console.log(`ERROR no db config specified!`)
  process.exit(1)
}
// tslint:disable-next-line:no-console
console.log(
  `DB Connection settings: type="${dbConfig.type}", host="${dbConfig.host}", port=${dbConfig.port}, db="${dbConfig.database}"`,
)

const options: ConnectionOptions = {
  ...Config.db,
  entities: [join(__dirname, '/../src/entity/*.js')],
  synchronize: true,
  migrationsRun: false,
  logging: true,
}

createConnection(options)
  .then(connection => {
    // tslint:disable-next-line:no-console
    console.log('Migrations done!')
    connection.close()
  })
  .catch(error => {
    // tslint:disable-next-line:no-console
    console.log(error)
    process.exit(1)
  })
