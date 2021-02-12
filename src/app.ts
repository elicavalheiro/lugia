require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

import express from 'express';
import cors from 'cors';
import routes from './routes';

interface AppInterface {
  app?: Object
}

class AppController implements AppInterface {
  app;

  constructor(){
    this.app = express();

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(){
    this.app.use(routes);
  }
}

export default new AppController().app;