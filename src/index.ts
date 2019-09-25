import * as express from 'express'
import { Application } from 'express'
import { initLocals, ensureDbConnection } from './expressApp'
import { routes } from './routes'
import * as bodyParser from 'body-parser'

// Get a stack trace when warnings are emitted.
process.on('warning', e => console.warn(e.stack))

export const server: Application = express()
const port = process.env.PORT || 8080

// Parses the client’s request from json into javascript objects
server.use(bodyParser.json())

server.use(initLocals)
// Ensure we have an active db connection.
server.use(ensureDbConnection)

// Routes
server.use('/', routes)

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${port}`)
})
