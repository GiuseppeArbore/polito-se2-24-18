const cors = require('cors');
import initRoutes from './src/routes';
import db from './src/db/db'
import { WebSocketExpress, Router } from 'websocket-express';
import { Request, Response, NextFunction } from 'express'

const app = new WebSocketExpress();
const router = new Router();

const port: number = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(router);
app.use(cors(corsOptions));

initRoutes(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status: number = err.status || 500;
  res.status(status).json({ message: err.message });
})

const server = app.createServer()
if (!module.parent) {
  server.listen(port, async () => {
    await db.open()
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export { app, server }
