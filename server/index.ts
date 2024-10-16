const cors = require('cors');
import initRoutes from './src/routes';
import db from './src/db/db'
import { WebSocketExpress, Router } from 'websocket-express';
import { registerErrorHandler } from './src/errorHandlers';

const app = new WebSocketExpress();
const router = new Router();

const port: number = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
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
