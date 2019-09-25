import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'

export interface EDUGOConfig {
  env: string
  appName: string
  db: ConnectionOptions
  jwtSecret: string
}
