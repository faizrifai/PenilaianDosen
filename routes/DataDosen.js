import express from "express";
import {
  createDosen,
  readDosen,
  readDosenId,
  putDosenId,
  putDosen,
  deleteDosen,
} from "../controller/DataDosen.js";
import {
  verifytoken,
  verifyuseradmin,
  verifyusermahasiswa,
  verifyuserdosen,
} from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
const router = express.Router();

router.get("/token", refreshToken);
router.get("/dosen", verifytoken, readDosen);
router.get("/dosen/:id", verifyuserdosen, verifytoken, readDosenId);
router.post("/dosen", verifyuseradmin, verifytoken, createDosen);
router.put("/dosen/:id", verifyuserdosen, verifytoken, putDosenId);
router.delete("/dosen/:id", verifyuseradmin, verifytoken, deleteDosen);

export default router;
