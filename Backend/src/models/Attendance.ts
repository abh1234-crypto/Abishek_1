import { Schema, model, Document } from 'mongoose';

export interface IAttendance extends Document {
  subject:    string;
  attended:   number;
  total:      number;
  percentage: number;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    subject:  { type: String, required: true },
    attended: { type: Number, required: true, min: 0 },
    total:    { type: Number, required: true, min: 1 },
    percentage: {
      type: Number,
      // Auto-compute on save
    },
  },
  { timestamps: true }
);

// Compute percentage before each save
AttendanceSchema.pre('save', function (next) {
  this.percentage = Math.round((this.attended / this.total) * 100);
  next();
});

export default model<IAttendance>('Attendance', AttendanceSchema);
