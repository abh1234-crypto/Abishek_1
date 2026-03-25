import { Schema, model, Document } from 'mongoose';

export interface IContact extends Document {
  name:         string;
  age:          number;
  gamingLaptop: string;
  subject:      string;
  message:      string;
  createdAt:    Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name:         { type: String, required: true },
    age:          { type: Number, required: true },
    gamingLaptop: { type: String, required: true },
    subject:      { type: String, required: true },
    message:      { type: String, required: true },
    createdAt:    { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<IContact>('Contact', ContactSchema);
