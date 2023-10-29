import 'dotenv/config';
import express from 'express';
import db from './db';

const startServer = async () => {
  await db;

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
