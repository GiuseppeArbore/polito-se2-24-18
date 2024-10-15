const cors = require('cors');
import express from 'express';
import initRoutes from './src/routes';
import db from './src/db/db'
import { Request, Response, NextFunction } from 'express';



const app: express.Application = express();

const port: number = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

initRoutes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status: number = err.status || 500;
  res.status(status).json({ message: err.message });
})

if (!module.parent) {
  app.listen(port, async () => {
    await db.open()
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export { app }
