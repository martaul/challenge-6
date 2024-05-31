import express from "express";
import { Me, Login, Logout } from "../controllers/Users.js";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/Admin.js";
import { verifyToken} from "../middleware/VerifyToken.js";
import { CheckRole, onlySuperAdmin} from "../middleware/CheckRole.js";
import upload from "../middleware/Upload.js";
import { refreshToken } from "../controllers/RefreshToken.js";

import { createCar, updateCars, getCars, deleteCars } from "../controllers/Cars.js";

const router = express.Router();

router.get('/me', verifyToken, Me); //semua role
router.get('/users', verifyToken, CheckRole("admin" && "super admin") , getUsers); //admin & super admin
router.post('/users', createUser); //semua role
router.patch('/users/:id', verifyToken, onlySuperAdmin("super admin"), updateUser); //super admin
router.delete('/users/:id', verifyToken, onlySuperAdmin("super admin"), deleteUser); //super admin
router.post('/login', Login); //semua role
router.post('/token', refreshToken); //semua role
router.delete('/logout', Logout); //semua role

router.get('/cars',verifyToken , getCars); //semua role
router.post('/cars', upload.single('image'),verifyToken, CheckRole("admin" && "super admin"), createCar); //admin & super admin
router.patch('/cars/:id', upload.single('image'), verifyToken, CheckRole("admin" && "super admin"), updateCars); //admin & super admin
router.delete('/cars/:id', verifyToken, CheckRole("admin" && "super admin"), deleteCars ); //admin & super admin

export default router;