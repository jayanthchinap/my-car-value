import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // phonenumber: { type: String, required: true },
});

export interface User extends mongoose.Document {
  email: string;
  password: string;
  // phonenumber: string;
}
