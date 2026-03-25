import { Schema, model, Document } from 'mongoose';

export interface IAcademicRecord extends Document {
  subject:  string;
  grade:    string;
  score:    number;
  semester: string;
  gpa:      number;
}

const AcademicRecordSchema = new Schema<IAcademicRecord>(
  {
    subject:  { type: String, required: true },
    grade:    { type: String, required: true },
    score:    { type: Number, required: true, min: 0, max: 100 },
    semester: { type: String, required: true },
    gpa:      { type: Number, required: true, min: 0, max: 10 },
  },
  { timestamps: true }
);

export default model<IAcademicRecord>('AcademicRecord', AcademicRecordSchema);
