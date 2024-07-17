import mongoose from 'mongoose';

const config = {
    username: process.env.MONGO_USERNAME,
    password: process.env.MOGNO_PASSWORD,
    db: process.env.MONGO_DB,
    host: process.env.MONGO_HOST,
    url: process.env.MONGO_URL
}

const options = {
    user: config.username,
    pass: config.password,
    authSource: 'admin',
    autoIndex: process.env.MONGO_AUTO_INDEX || false
}

async function connect() {
    const connectionUrl = config.url +  config.username + ":" + config.password + "@" + config.host + config.db;
    try {
        mongoose.connection.on('connecting', () => {
            console.log('connecting', { state: mongoose.connection.readyState }) //logs 2
        });
        mongoose.connection.on('connected', () => {
            console.log('connected', { state: mongoose.connection.readyState }) //logs 1
        });
        mongoose.connection.on('disconnecting', () => {
            console.log('disconnecting', { state: mongoose.connection.readyState }) //logs 3
        });
        mongoose.connection.on('disconnected', () => {
            console.log('disconnected', { state: mongoose.connection.readyState }) //logs 0
        });
        mongoose.connection.on('error', (e) => {
            console.log('mongoose error', e.message);
        });
        return await mongoose.connect(connectionUrl, options);
    } catch (error) {
        console.log(error);
    }


    return mongoose;
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

async function disconnect() {
    try {

        await mongoose.disconnect().catch(e => {
            console.log("mongoose disconnect error", e.message);
        })
        console.log("mongoose disconnected");
    } catch (error) {
        console.log("mongoose disconnect err", error.message);
    }


    return mongoose;
}

export { connect, disconnect, mongoose};