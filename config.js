process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'local') {
  urlDB = 'mongodb://localhost:27017/coffee';
} else {
  urlDB =
    'mongodb+srv://dariosoto:13121987xd@daario-vfcs8.mongodb.net/coffee?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;
