// @flow

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ProductsRouter from './routers/products';

export default class Api {

  // annotate with the express $Application type
  express: express$Application;

  // create the express instance, attach app-level middleware, attach routers
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // register middlewares
  middleware() {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // connect resource routers
  routes() {
    // create an instance of ProductsRouter
    const productsRouter = new ProductsRouter();

    // attach it to our express app
    this.express.use(productsRouter.path, productsRouter.router);
  }

}
