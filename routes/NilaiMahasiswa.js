import express from "express";
import {
  createNilai,
  readNilai,
  readNilaiId,
  updateNilai,
  deleteNilai,
} from "../controller/NilaiMahasiswa.js";
const router = express.Router();

router.post("/nilai", createNilai);
router.get("/nilai", readNilai);
router.get("/nilai/:id", readNilaiId);
router.put("/nilai/:id", updateNilai);
router.delete("/nilai/:id", deleteNilai);

export default router;
