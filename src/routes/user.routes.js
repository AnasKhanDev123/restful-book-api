import { Router } from 'express';
import { loginUserValidator, registerUser } from '../validators/index.js';
import validate from '../middleware/validate.middleware.js';
import { createUser, getUsers, loginUser } from '../controller/user.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser(), validate, createUser);
router.route('/login').post(loginUserValidator(), validate, loginUser);
router.route('/').get(auth, getUsers);
export default router;
