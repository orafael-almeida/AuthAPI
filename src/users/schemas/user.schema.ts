import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

export const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
});

UsersSchema.pre('save', async function (next: NextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['password'] = await bcrypt.hash(this['password'], 10);
  } catch (err) {
    return next(err);
  }
});
