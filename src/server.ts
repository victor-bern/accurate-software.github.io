import express from 'express';
import 'reflect-metadata';

import router from './routes/';
import './database';

import itemRoute from './routes/item.routes';
import itemRouter from './routes/item.routes';

const app = express();

app.use(express.json())
app.use(router);

app.use('/item', itemRouter)

app.listen(3333, () => {
  console.log("Server on");
})