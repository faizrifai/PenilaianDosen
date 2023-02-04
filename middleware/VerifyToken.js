import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const verifytoken = async (req, res, next) => {
  if (!req.session.id)
    return res.status(401).json("silahkan login terlebih dahulu");
  const user = await prisma.user.findFirst({
    where: { id: req.session.IdUser },
  });
  req.IdUser = user.id;
  req.role = user.role;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(404);
    req.username = decoded.username;
    next();
  });
};

export const verifyusermahasiswa = async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: { id: req.session.IdUser },
  });
  if (!user) return res.status(401).json("user tidak ada");
  if (user.role !== "mahasiswa")
    return res.status(403).json("akses dilaran, anda bukan mahasiswa");
  next();
};

export const verifyuseradmin = async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: { id: req.session.IdUser },
  });
  if (!user) return res.status(401).json("user tidak ada");
  if (user.role !== "admin")
    return res.status(403).json("akses dilarang, anda bukan admin");
  next();
};

export const verifyuserdosen = async (req, res, next) => {
  const user = await prisma.user.findFirst({
    where: { id: req.session.IdUser },
  });
  if (!user) return res.status(401).json("user tidak ada");
  if (user.role !== "dosen")
    return res.status(403).json("akses dilarang, anda bukan dosen");
  next();
};
