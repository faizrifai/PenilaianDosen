import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import e from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { username, password, confpassword, role } = req.body;
  if (password != confpassword)
    return res.status(400).json({ msg: "password tidak sama" });
  const user = await prisma.user.findUnique({ where: { username } });
  if (role == "admin") {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const post = await prisma.user.create({
      data: {
        username,

        password: hashPassword,

        role,

        refresh_token: "",
      },
    });
    return res.json(post);
  }
  if (user == null && role == "dosen") {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const post = await prisma.user.create({
      data: {
        username,

        password: hashPassword,

        role,

        refresh_token: "",

        data_dosen: {
          create: {
            nama: username,
            nip: username,
            tanggal_lahir: new Date("2020-12-12"),
            nomor_telepon: "",
            alamat: "",
          },
        },
      },
    });
    return res.json(post);
  }
  if (user == null && role == "mahasiswa") {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const post = await prisma.user.create({
      data: {
        username,

        password: hashPassword,

        role,

        refresh_token: "",

        data_mahasiswa: {
          create: {
            nama: username,
            nim: username,
          },
        },
      },
    });
    return res.json(post);
  }
  const user1 = user.username;
  console.log(user1);
  if (username == user1)
    return res.status(401).json({ msg: "username telah digunakan" });
};

export const readUser = async (req, res) => {
  const post = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  res.json(post);
};

export const readUserId = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.user.findUnique({
    where: { id: +id },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  res.json(post);
};

export const ChangeUser = async (req, res) => {
  const { id } = req.params;
  const { username, password, confpassword } = req.body;
  if (password != confpassword)
    return res.status(400).json({ msg: "password tidak sama" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  let post;
  if (req.role == "admin") {
    post = await prisma.user.update({
      where: { id: +id },
      data: {
        username,
        password: hashPassword,
      },
    });
    return res.json(post);
  } else {
    post = await prisma.user.update({
      where: { id: +id },
      data: {
        password: hashPassword,
      },
    });
    return res.json(post);
  }
};

export const Login = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user == null) {
      return res.status(404).json({ msg: "Username tidak ada" });
    }
    //  res.json(user);
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(404).json({ msg: "Salah password" });
    }
    req.session.IdUser = user.id;
    const userId = user.id;
    const usernameId = user.username;
    const roleId = user.role;
    const accessToken = jwt.sign(
      { userId, usernameId, roleId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { userId, usernameId, roleId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await prisma.user.update({
      where: {
        id: +userId,
      },
      data: {
        refresh_token: refreshToken,
      },
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      accessToken,
      refreshToken,
      id: userId,
      username: usernameId,
      role: roleId,
    });
  } catch (error) {
    console.log(error);
    //res.status(404).json({ msg: "Username tidak ada" });
  }
};

export const Me = async (req, res) => {
  if (!req.session.IdUser) {
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  }
  const post = await prisma.user.findUnique({
    where: { id: req.session.IdUser },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
  res.json(post);
};

export const Profile = async (req, res) => {
  if (!req.session.IdUser) {
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  }
  const user = await prisma.user.findUnique({
    where: { id: req.session.IdUser },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
  let profile;
  if (user.role == "dosen") {
    profile = await prisma.user.findUnique({
      where: { id: req.session.IdUser },
      select: {
        id: true,
        username: true,
        role: true,
        data_dosen: {
          select: {
            id: true,
            nama: true,
            nip: true,
            tanggal_lahir: true,
            nomor_telepon: true,
            alamat: true,
          },
        },
      },
    });
    return res.json(profile);
  }
  if (user.role == "mahasiswa") {
    profile = await prisma.user.findUnique({
      where: { id: req.session.IdUser },
      select: {
        id: true,
        username: true,
        role: true,
        data_mahasiswa: {
          select: {
            id: true,
            nama: true,
            nim: true,
          },
        },
      },
    });
    return res.json(profile);
  }
  if (user.role == "admin") {
    profile = await prisma.user.findUnique({
      where: { id: req.session.IdUser },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    console.log(profile);
    return res.json(profile);
  }
};

export const Logout = async (req, res) => {
  if (!req.session.IdUser)
    return res.status(400).json({ msg: "Silahkan login" });
  const post = await prisma.user.update({
    where: {
      id: req.session.IdUser,
    },
    data: {
      refresh_token: "",
    },
  });
  res.clearCookie("refreshToken");
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "anda berhasil logout" });
  });
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.user.delete({
    where: { id: +id },
  });
  res.json({ message: "User berhasil dihapus", post });
};

export const DeleteAllUser = async (req, res) => {
  const post = await prisma.user.deleteMany({
    where: { NOT: { username: "admin" } },
  });
  return res.json({
    message: "Semua user berhasil dihapus",
    post,
  });
};
