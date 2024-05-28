import express from "express";
import { Me, Login, Logout } from "../controllers/Users.js";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/Admin.js";
import { verifyToken, adminOnly} from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

import { getCars, createCar } from "../controllers/Cars.js";

const router = express.Router();

router.get('/me',verifyToken, Me);
router.get('/users', verifyToken, adminOnly, getUsers);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', Login);
router.post('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/cars', getCars);
router.post('/cars', createCar);

export default router;