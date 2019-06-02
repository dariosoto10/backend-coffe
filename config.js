process.env.PORT = process.env.PORT || 3000
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.TOKEN_EXPIRY = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED || 'my_secret_seed'

let urlDB

if (process.env.NODE_ENV === 'local') {
  urlDB = 'mongodb://localhost:27017/coffee'
} else {
  urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB
