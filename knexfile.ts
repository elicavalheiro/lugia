import path from 'path';
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const connection = () => {
  if(process.env.NODE_ENV === 'test'){
    return {
      filename: path.resolve(__dirname, '__tests__', 'database.sqlite')
    }
  }

  return {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
}

module.exports = {
  client: process.env.DB_CLIENT || 'pg',
  connection,
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations'),
  },
  useNullAsDefault: true,
}