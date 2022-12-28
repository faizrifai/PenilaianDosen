import express  from "express"
import {
    createDosen,
    readDosen,
    readDosenId,
    putDosenId,
    putDosen,
    deleteDosen
} from "../controller/DataDosen.js"

const router = express.Router()

router.get('/dosen', readDosen)
router.get('/dosen/:id', readDosenId)
router.post('/dosen', createDosen)
router.put('/dosen', putDosen)
router.put('/dosen', putDosenId)
router.delete('/dosen', deleteDosen)

export default router