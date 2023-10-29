import { Router } from 'express';
import Employee from '../models/Employee';

const router = Router();

// creates a new employee
router.post('/create', async (req, res) => {
  try {
    const { lastName, firstName, department } = req.body;

    // Create a new employee object with the provided data
    const newEmployee = new Employee({
      lastName,
      firstName,
      department,
      dateCreated: new Date(),
    });

    // Save the new employee to the database
    await newEmployee.save();

    // Return the new employee object as a JSON response
    res.status(201).json(newEmployee);
  } catch (error: any) {
    // If there's an error, return a 400 status code with the error message
    res.status(400).json({ error: error.message });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    // Search for all employees
    const employees = await Employee.find({});

    // Return the employees array as a JSON response
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by date
router.get('/by-date', async (req, res) => {
  try {
    // Get the date from query parameters
    const { date } = req.query;

    // If no date is provided, return a 400 status code with an error message
    if (!date) {
      return res
        .status(400)
        .json({ error: "You must provide a 'date' query parameter" });
    }

    // Find all employees created on the provided date
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
    // Get the employee ID from the URL parameters
    const { id } = req.params;

    // Get the comment from the request body
    const { comment } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    // If no employee is found, return a 404 status code with an error message
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // If the employee has already checked in, return a 400 status code with an error message
    if (employee.checkInTime) {
      return res.status(400).json({ error: 'Employee already checked in' });
    }

    // Set the employee's check in time to the current date
    employee.checkInTime = new Date();
    if (comment) {
      employee.comments.push(`Check-in: ${comment}`);
    }

    // Save the employee to the database
    await employee.save();
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Employee check out
router.post('/:id/check-out', async (req, res) => {
  try {
    // Get the employee ID from the URL parameters
    const { id } = req.params;

    // Get the comment from the request body
    const { comment } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);

    // If no employee is found, return a 404 status code with an error message
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // If the employee has not checked in, return a 400 status code with an error message
    if (!employee.checkInTime) {
      return res.status(400).json({ error: 'Employee has not checked in' });
    }

    // If the employee has already checked out, return a 400 status code with an error message
    if (employee.checkOutTime) {
      return res.status(400).json({ error: 'Employee already checked out' });
    }

    employee.checkOutTime = new Date();
    if (comment) {
      employee.comments.push(`Check-out: ${comment}`);
    }

    // Calculate the number of hours worked
    const duration =
      (employee.checkOutTime.getTime() - employee.checkInTime.getTime()) / 1000;
    const hoursWorked = duration / 3600;

    // Save the employee to the database
    await employee.save();
    res.json({ ...employee.toObject(), hoursWorked });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
