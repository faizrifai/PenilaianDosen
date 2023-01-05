import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  const { username, password, role } = req.body;
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
          matakuliah: "",
          tanggal_lahir: new Date("2020-12-12"),
          nomor_telepon: "",
          alamat: "",
        },
      },
    },
  });
  res.json(post);
};

export const readUser = async (req, res) => {
  const post = await prisma.user.findMany({});

  res.json(post);
};

export const ChangeUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const post = await prisma.user.update({
    where: { id: +id },
    data: {
      username,
      password: hashPassword,
    },
  });
  res.json(post);
};

export const Login = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        username: req.body.username,
      },
    });
    //  res.json(user);
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(404).json({ msg: "Salah password" });
    }
    const userId = user[0].id;
    const usernameId = user[0].username;
    const roleId = user[0].role;
    const accessToken = jwt.sign(
      { userId, usernameId, roleId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
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
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(404).json({ msg: "Username tidak ada" });
  }
};

export const DeleteUser = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.user.delete({
    where: { id: +id },
  });
  res.json({ message: "Id berhasil dihapus", post });
};
