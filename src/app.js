import { feathers } from '@feathersjs/feathers'
import express, { json, urlencoded, rest } from '@feathersjs/express'
const app = express(feathers())

// Turn on JSON parser for REST services
app.use(json())

// Turn on URL-encoded parser for REST services
app.use(urlencoded({ extended: true }))

// Set up REST transport
app.configure(rest())

export default app;