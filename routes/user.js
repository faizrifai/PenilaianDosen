import express from "express";
import {
  createUser,
  Login,
  readUser,
  ChangeUser,
  DeleteUser,
} from "../controller/user.js";
import { verifytoken } from "../middleware/VerifyToken.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", Login);
router.get("/user", readUser);
router.put("/edituser/:id", ChangeUser);
router.delete("/deleteuser/:id", DeleteUser);

export default router;
