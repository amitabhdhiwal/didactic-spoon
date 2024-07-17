import app from './app.js'

const port = process.env.HTTP_PORT || 3030;
const server = await app.listen(port)

export default server;