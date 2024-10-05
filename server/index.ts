const cors = require('cors');
import express from 'express';

const app: express.Application = express();

const port: number = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/queue/number", async (req, res) => {
  res.status(200).json({ok: "ok"});
});

if (!module.parent) {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

export { app }
