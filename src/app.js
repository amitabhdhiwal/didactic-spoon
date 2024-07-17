import dotenv from 'dotenv/config';
import { feathers } from '@feathersjs/feathers'
import express, { json, urlencoded, rest } from '@feathersjs/express'
import { connect, disconnect, mongoose } from './lib/db.js';

const app = express(feathers())

app.hooks({
    setup: [async context => {
        await connect();
    }],
    teardown: [async context => {
        await disconnect();
    }]
});

// Turn on JSON parser for REST services
app.use(json())

// Turn on URL-encoded parser for REST services
app.use(urlencoded({ extended: true }))

// Set up REST transport
app.configure(rest())

export default app;