import mongoose, { Document } from 'mongoose';

export interface TimeLogDocument extends Document {
  employee: mongoose.Schema.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  comment: string;
}

const timeLogSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  checkIn: { type: Date },
  checkOut: { type: Date },
  comment: { type: String },
});

const TimeLog = mongoose.model<TimeLogDocument>('TimeLog', timeLogSchema);

export default TimeLog;
