import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: number;
  email: string;
  password: string;
}
