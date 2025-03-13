import express from "express";
import { addBook, getBooks } from "../controllers/bookController.js";
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router();
router.get("/",getBooks)
router.post("/",upload.single("coverImage"),addBook)
export default router