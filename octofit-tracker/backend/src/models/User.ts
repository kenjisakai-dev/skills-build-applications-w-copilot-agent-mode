import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  age: number;
  created_at: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age:      { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', UserSchema);
