import 'dotenv/config';
import db from './db';
import express from 'express';

// Routes
import employeeRoutes from './routes/employees';

// Create Express server
export const app = express();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Connect to database
  await db;

  app.use(express.json());

  // Home route
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  // Routes
  app.use('/employees', employeeRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

startServer();
