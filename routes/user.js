import express from "express";
import { createUser, Login, readUser } from "../controller/user.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);
router.get("/user", readUser);

export default router;
