import express from "express";
import { uploadFile } from "../middleware/upload.js";
import { createUserWithExcel, getTutorials } from "../controller/NyobaExcel.js";

const router = express.Router();

router.post("/upload", uploadFile.single("file"), createUserWithExcel);
router.get("/tutorials", getTutorials);

export default router;
