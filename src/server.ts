require('dotenv').config();
import path from 'path';
import app from './app';

const port = process.env.APP_PORT || 3333;

console.log(path.resolve(__dirname, '..' , '__tests__', 'database.sqlite'))

app.listen(port, () => {
  console.log(`--- Server running at port ${port} ---`)
});