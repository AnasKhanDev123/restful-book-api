import User from '../model/user.model.js';
import apiError from '../utils/apiError.js';

export const registerUser = async (data) => {

  const existingUser = await User.findOne({ email: data?.email });

  if (existingUser) {
    throw new apiError(400, 'user already exists');
  }

  const user = await User.create(data);

  const token = user.getJwtToken();

  return { user, token };
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  if (!user) {
    throw new apiError(400, 'invalid credentials');
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new apiError(400, 'invalid credentials');
  }

  const token = user.getJwtToken();

  return { user, token };
};

export const getUsersService = async () => {
  const user = await User.find();

  if (user.length === 0) {
    throw new apiError(400, 'no user found');
  }

  return user;
};
