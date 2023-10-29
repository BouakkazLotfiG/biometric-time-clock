import { Router } from 'express';
import Employee from '../models/Employee';

const router = Router();

// Create employee
router.post('/create-employee', async (req, res) => {
  try {
    const { lastName, firstName, department } = req.body;

    const newEmployee = new Employee({
      lastName,
      firstName,
      department,
      dateCreated: new Date(),
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by date
router.get('/employees/by-date', async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ error: "You must provide a 'date' query parameter" });
    }

    const employees = await Employee.find({
      dateCreated: {
        $gte: new Date(date as string),
        $lt: new Date(new Date(date as string).getTime() + 24 * 60 * 60 * 1000),
      },
    });

    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
