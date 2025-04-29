import { Document, Model, Schema, model, models } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  specialization: string;
  experience: number;
  consult_type: string;
  consult_fee: number;
  location: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  consult_type: {
    type: String,
    required: true,
  },
  consult_fee: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

export const Doctor: Model<IDoctor> = models.Doctor || model("Doctor", schema);
