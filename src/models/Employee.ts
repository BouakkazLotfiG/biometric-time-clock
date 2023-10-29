import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  lastName: string;
  firstName: string;
  dateCreated: Date;
  department: string;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  comments: string[];
}

const employeeSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  department: { type: String, required: true },
  checkInTime: { type: Date, default: null },
  checkOutTime: { type: Date, default: null },
  comments: [{ type: String }],
});

const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);

export default Employee;
