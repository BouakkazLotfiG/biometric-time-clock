import { Router } from 'express';
import Employee from '../models/Employee';

const router = Router();

router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
