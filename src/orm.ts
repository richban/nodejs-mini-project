import { Connection, ConnectionOptions, getConnectionManager, ConnectionManager } from 'typeorm'
import { Config } from './config'
import { join } from 'path'

export interface IDboSettings {
  forceDropSchema: boolean
  debug?: boolean
}

export async function dbo(settings: IDboSettings = { forceDropSchema: false, debug: true }): Promise<Connection> {
  const { forceDropSchema, debug } = settings
  const useInMemoryDb = String(Config.db.database).startsWith(':') // might add because of unit tests
  let conn: Connection
  const mgr: ConnectionManager = getConnectionManager()

  const options: ConnectionOptions = {
    ...Config.db,
    entities: [join(__dirname, '/entity/*.js')],
    synchronize: useInMemoryDb, // Always sync if using in-memory db.
    migrationsRun: false,
    // Only allow dropping the schema for in-memory and when forceDropSchema is true
    dropSchema: useInMemoryDb && forceDropSchema,
    logging: debug,
  }

  // Checks if a connection is registered in the given connection manager.
  if (!mgr.has('default')) {
    conn = mgr.create(options)
  } else {
    // Gets already created connection stored in the manager by its name.
    conn = mgr.get()
    if (options.dropSchema) {
      await conn.close()
      conn = mgr.create(options)
    }
  }

  if (!conn.isConnected) {
    let dbInfo: string = 'unknown connection'
    if (options.type === 'sqlite') {
      dbInfo = 'localhost'
    }
    // tslint:disable-next-line:no-console
    console.log(`Connecting via ${options.type} to ${options.database} on ${dbInfo}`)
    await conn.connect()
  }

  return conn
}
