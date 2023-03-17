import * as mongoose from 'mongoose';
import { Schema, Document } from 'mongoose';

export const UserSchema = new mongoose.Schema({
  // id: {
  //   type: mongoose.Types.ObjectId,
  //   default: mongoose.Types.ObjectId,
  // },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  // _id: string;
  email: string;
  password: string;
}

// import * as mongoose from 'mongoose';
// import { Schema, Document } from 'mongoose';
// // import * as shortid from 'shortid';

// export const UserSchema = new mongoose.Schema({
//   // _id: { type: String, default: () => shortid.generate() },
//   // _id: {
//   //   type: String,
//   //   default: () => new mongoose.Types.ObjectId().toString(),
//   // },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// export interface User extends mongoose.Document {
//   // _id: string;
//   email: string;
//   password: string;
// }
