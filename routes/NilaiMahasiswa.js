import express from "express";
import {
  createNilai,
  readNilai,
  readNilaiId,
  updateNilai,
  deleteNilai,
  deleteAllNilai,
  readNilaiMhs,
} from "../controller/NilaiMahasiswa.js";
import {
  verifytoken,
  verifyusermahasiswa,
  verifyuseradmin,
  verifyuserdosen,
} from "../middleware/VerifyToken.js";
const router = express.Router();

router.post("/nilai", verifytoken, verifyuserdosen, createNilai);
router.get("/nilai", readNilai);
router.get("/nilaisaya", verifyusermahasiswa, verifytoken, readNilaiMhs);
router.get("/nilai/:id", verifytoken, verifyuserdosen, readNilaiId);
router.put("/nilai/:id", verifytoken, verifyuserdosen, updateNilai);
router.delete("/nilai/:id", verifytoken, verifyuserdosen, deleteNilai);
router.delete("/nilai", verifytoken, verifyuseradmin, deleteAllNilai);

export default router;
