import { registerUser, loginUserService, getUsersService } from '../service/user.service.js';
import ApiResponse from '../utils/api-response.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createUser = asyncHandler(async (req, res) => {
  const { user, token } = await registerUser(req.body);

  return res.status(201).json(new ApiResponse(201, { user, token }, 'user register successfully'));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUserService(email, password);

  return res.status(200).json(new ApiResponse(200, { user, token }, 'user login successfully'));
});

export const getUsers = asyncHandler(async (req, res) => {
  const user = await getUsersService();

  return res.status(200).json(new ApiResponse(200, { user }, 'user found successfully'));
});
