import { Router } from 'express';
import Employee from '../models/Employee';

const router = Router();

// Create employee
router.post('/create', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by date
router.get('/by-date', async (req, res) => {
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

// Employee check in
router.post('/:id/check-in', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // TODO: Check if employee has already checked in today
    if (employee.checkInTime) {
      return res.status(400).json({ error: 'Employee already checked in' });
    }

    employee.checkInTime = new Date();
    if (comment) {
      employee.comments.push(`Check-in: ${comment}`);
    }

    await employee.save();
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Employee check out
router.post('/:id/check-out', async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    if (!employee.checkInTime) {
      return res.status(400).json({ error: 'Employee has not checked in' });
    }

    if (employee.checkOutTime) {
      return res.status(400).json({ error: 'Employee already checked out' });
    }

    employee.checkOutTime = new Date();
    if (comment) {
      employee.comments.push(`Check-out: ${comment}`);
    }

    // TODO: Calculate hours worked
    const duration =
      (employee.checkOutTime.getTime() - employee.checkInTime.getTime()) / 1000;
    const hoursWorked = duration / 3600;

    await employee.save();
    res.json({ ...employee.toObject(), hoursWorked });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
