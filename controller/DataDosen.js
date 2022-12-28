import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

export const createDosen = async (req, res) => {
    const { nama, nip, matakuliah, tanggal_lahir, nomor_telepon, alamat, authorId  } = req.body
    try {
    const post = await prisma.Data_dosen.create({
  
      data: {
  
        nama,
  
        nip,
  
        matakuliah,
  
        tanggal_lahir: new Date(tanggal_lahir),

        nomor_telepon,

        alamat,

        authorId
  
      }
    })
    res.json(post)
    } catch (error) {
        res.json("data yang ada masukan ada kesalahan")
    }
}

  export const readDosen = async (req, res) => {

    const post = await prisma.Data_dosen.findMany({  
    })
  
    res.json(post)
};

export const readDosenId = async (req, res) => {
  const { id } = req.params
  const post = await prisma.Data_dosen.findUnique({
    where: { id: +id },
   })
   if (post){
    res.json(post)
   }
  else {
    res.json("data tidak ditemukan")
  }
}

export const putDosen = async (req, res) => {

};

export const putDosenId = async (req, res) => {

};

export const deleteDosen = async (req, res) => {

};