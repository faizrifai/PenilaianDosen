import express from "express";
import {
  createUser,
  Login,
  Logout,
  Me,
  Profile,
  readUser,
  readUserId,
  ChangeUser,
  DeleteUser,
  DeleteAllUser,
} from "../controller/user.js";
import {
  verifytoken,
  verifyusermahasiswa,
  verifyuseradmin,
  verifyuserdosen,
} from "../middleware/VerifyToken.js";
const router = express.Router();

router.post("/register", verifyuseradmin, createUser);
router.post("/login", Login);
router.delete("/logout", Logout);

router.get("/user", verifytoken, verifyuseradmin, readUser);
router.get("/me", Profile);
router.get("/user/:id", verifytoken, verifyuseradmin, readUserId);
router.put("/edituser/:id", verifytoken, ChangeUser);
router.delete("/deleteuser/:id", verifytoken, verifyuseradmin, DeleteUser);
router.delete("/deleteuser", verifytoken, verifyuseradmin, DeleteAllUser);

export default router;
