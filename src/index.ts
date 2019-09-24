import * as express from 'express'
import { Application } from 'express'

// Get a stack trace when warnings are emitted.
process.on('warning', e => console.warn(e.stack))

export const server: Application = express()
const port = process.env.PORT || 8080

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Listening on port ${port}`)
})
