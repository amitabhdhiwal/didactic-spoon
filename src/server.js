import app from './app.js'

const port = process.env.HTTP_PORT || 3000;
const server = await app.listen(port)

export default server;