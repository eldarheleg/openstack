require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGO_DB

module.exports = { MONGODB_URL, PORT }