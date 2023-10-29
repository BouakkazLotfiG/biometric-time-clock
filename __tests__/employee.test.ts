import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';
import db from '../src/db';

describe('GET /api/employees', () => {
  beforeAll(async () => {
    // Connect to a database
    await db;
  });

  afterAll(async () => {
    // Close the database connection
    await mongoose.connection.close();
  });

  it('should return all employees', async () => {
    const res = await request(app).get('/employees').expect(200);

    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
