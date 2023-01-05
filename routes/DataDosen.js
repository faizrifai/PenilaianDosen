import express from "express";
import {
  createDosen,
  readDosen,
  readDosenId,
  putDosenId,
  putDosen,
  deleteDosen,
} from "../controller/DataDosen.js";
import { verifytoken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
const router = express.Router();

router.get("/token", refreshToken);
router.get("/dosen", verifytoken, readDosen);
router.get("/dosen/:id", verifytoken, readDosenId);
router.post("/dosen", verifytoken, createDosen);
router.put("/dosen/:id", verifytoken, putDosen);
router.put("/dosen", putDosenId);
router.delete("/dosen/:id", verifytoken, deleteDosen);

export default router;
