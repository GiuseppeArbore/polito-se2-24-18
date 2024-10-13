const cors = require('cors');
import express from 'express';
import initRoutes from './src/routes';
import db from './src/db/db'

const app: express.Application = express();

const port: number = 3001;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

initRoutes(app);

if (!module.parent) {
  app.listen(port, async () => {
    await db.open()
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export { app }
