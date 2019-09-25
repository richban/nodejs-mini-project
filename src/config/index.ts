import { EDUGOConfig } from './configTypes'
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'

const dbDriver: ConnectionOptions = {
  type: 'sqlite',
  database: String(process.env.DB_NAME).startsWith(':') ? String(process.env.DB_NAME) : `${process.env.DB_NAME}.db`,
}

export const Config: EDUGOConfig = {
  env: process.env.NODE_ENV || 'local',
  appName: 'Edugo AI Mini-project API',
  db: dbDriver,
  jwtSecret: process.env.JWT_SECRET || '',
}
