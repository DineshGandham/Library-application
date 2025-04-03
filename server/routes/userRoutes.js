import express from 'express';
import { verifyUser } from '../controllers/userController';


const router = express.Router();

router.post("/login",verifyUser)

export default router;