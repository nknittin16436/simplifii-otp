import mongoose from 'mongoose';
import { IUser } from '../util/user.dto';

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  otp: {
    value: { type: String, default: null },
    generatedAt: { type: Date, default: null }
  },
  numFailedAttempts: { type: Number, default: 0 },
  blockedAt: { type: Date, default: null }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;