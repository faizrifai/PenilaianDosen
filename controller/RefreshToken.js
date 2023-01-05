import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const user = await prisma.user.findMany({
      where: { refresh_token: refreshToken },
    });
    console.log(refreshToken);
    if (!user[0]) {
      return res.sendStatus(401);
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
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
        res.json(accessToken);
      }
    );
  } catch (error) {}
};
