import 'dotenv/config';
import db from './db';
import express from 'express';

// Routes
import employeeRoutes from './routes/employees';

const startServer = async () => {
  // Connect to database
  await db;

  // Create Express server
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // Routes
  app.use('/api', employeeRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
