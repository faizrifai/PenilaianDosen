import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const readNilaiMhs = async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: req.IdUser },
  });
  const post = await prisma.nilai.findMany({
    where: { nim: user.username },
  });

  res.json(post);
};

export const createNilai = async (req, res) => {
  const {
    nama,
    nim,
    matakuliah,
    nilai_harian,
    bobot1,
    ulangan_tengah,
    bobot2,
    ulangan_akhir,
    bobot3,
    sks,
  } = req.body;
  const total_bobot = bobot1 + bobot2 + bobot3;
  if (total_bobot > 100) {
    return res.json("bobot tidak boleh lebih dari 100%");
  }
  if (nilai_harian > 100 || ulangan_tengah > 100 || ulangan_akhir > 100) {
    return res.json("nilai tidak boleh lebih dari 100");
  }
  const hasil =
    nilai_harian * (bobot1 / 100) +
    ulangan_tengah * (bobot2 / 100) +
    ulangan_akhir * (bobot3 / 100);
  console.log(hasil);
  if (hasil <= 100 && hasil >= 85) {
    var IPK = 4;
  } else if (hasil <= 84 && hasil >= 80) {
    var IPK = 3.7;
  } else if (hasil < 80 && hasil >= 75) {
    var IPK = 3.3;
  } else if (hasil < 75 && hasil >= 70) {
    var IPK = 3;
  } else if (hasil < 70 && hasil >= 65) {
    var IPK = 2.7;
  }
  try {
    const post = await prisma.nilai.create({
      data: {
        nama,

        nim,

        matakuliah,

        nilai_harian,

        bobot1,

        ulangan_tengah,

        bobot2,

        ulangan_akhir,

        bobot3,

        hasil: hasil,

        sks,

        IP: IPK,
      },
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const readNilai = async (req, res) => {
  const post = await prisma.nilai.findMany({});

  res.json(post);
};

export const readNilaiId = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.nilai.findUnique({
    where: { id: +id },
  });
  if (post) {
    res.json(post);
  } else {
    res.json("data tidak ditemukan");
  }
};

export const updateNilai = async (req, res) => {
  const { id } = req.params;
  const {
    nama,
    nilai_harian,
    bobot1,
    ulangan_tengah,
    bobot2,
    ulangan_akhir,
    bobot3,
    sks,
  } = req.body;
  const total_bobot = bobot1 + bobot2 + bobot3;
  if (total_bobot > 100) {
    return res.json("bobot tidak boleh lebih dari 100%");
  }
  if (nilai_harian > 100 || ulangan_tengah > 100 || ulangan_akhir > 100) {
    return res.json("nilai tidak boleh lebih dari 100");
  }
  const hasil =
    nilai_harian * (bobot1 / 100) +
    ulangan_tengah * (bobot2 / 100) +
    ulangan_akhir * (bobot3 / 100);
  console.log(hasil);
  if (hasil <= 100 && hasil >= 85) {
    var IPK = 4;
  } else if (hasil <= 84 && hasil >= 80) {
    var IPK = 3.7;
  } else if (hasil < 80 && hasil >= 75) {
    var IPK = 3.3;
  } else if (hasil < 75 && hasil >= 70) {
    var IPK = 3;
  } else if (hasil < 70 && hasil >= 65) {
    var IPK = 2.7;
  }
  try {
    const post = await prisma.nilai.update({
      where: { id: +id },
      data: {
        nama,

        nilai_harian,

        bobot1,

        ulangan_tengah,

        bobot2,

        ulangan_akhir,

        bobot3,

        hasil: hasil,

        sks,

        IP: IPK,
      },
    });
    res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const deleteNilai = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await prisma.nilai.delete({
      where: { id: +id },
    });
    if (post) {
      res.json({ post, message: "Data berhasil dihapus!" });
    }
  } catch (error) {
    res.json("data tidak ada");
  }
};

export const deleteAllNilai = async (req, res) => {
  try {
    const post = await prisma.nilai.deleteMany({});
    if (post) {
      res.json({ post, message: "Semua data berhasil dihapus!" });
    }
  } catch (error) {
    res.json("data tidak ada");
  }
};
