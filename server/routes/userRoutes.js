import express from 'express';
import { verifyUser, registerUser, getUserProfile } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/login",verifyUser)
router.post("/register",registerUser)
router.post("/user",protect,getUserProfile)

export default router;