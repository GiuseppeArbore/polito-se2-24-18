const cors = require('cors');
const express = require('express');
import initRoutes from './src/routes';
import db from './src/db/db'
import { WebSocketExpress, Router } from 'websocket-express';
import { registerErrorHandler } from './src/errorHandlers';

const app = new WebSocketExpress();
const router = new Router();

const port: number = 3001;

const corsOptions = {
  origin: '*',
  credentials: true,
};
app.use(cors(corsOptions));
router.use(express.json());

app.use(router);

initRoutes(router);
registerErrorHandler(router);
const server = app.createServer()

if (!module.parent) {
  server.listen(port, async () => {
    await db.open()
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export { app, server }
