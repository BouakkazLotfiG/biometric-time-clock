import mongoose, { Document } from 'mongoose';

export interface EmployeeDocument extends Document {
  lastName: string;
  firstName: string;
  dateCreated: Date;
  department: string;
}

const employeeSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  dateCreated: { type: Date, required: true, default: Date.now },
  department: { type: String, required: true },
});

const Employee = mongoose.model<EmployeeDocument>('Employee', employeeSchema);

export default Employee;
