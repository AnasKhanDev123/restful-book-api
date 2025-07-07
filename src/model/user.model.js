import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJwtToken = function () {
  const payLoads = {
    id: this._id,
  };
  return jwt.sign(payLoads, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

userSchema.methods.generateRefreshToken = function () {
  const payLoads = {
    id: this._id,
  };
  return jwt.sign(payLoads, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
};

export default model('User', userSchema);
