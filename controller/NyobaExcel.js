import { PrismaClient } from "@prisma/client";
import xlsx from "xlsx";
import readXlsxFile from "read-excel-file/node";

const prisma = new PrismaClient();

export const createUserWithExcel = async (req, res) => {
  const file = req.file;
  const tutor = await prisma.user.findMany({});
  if (file == undefined) {
    return res.status(400).send("Hanya dapat upload file excel!");
  }
  let path = "resources/uploads/" + req.file.filename;
  readXlsxFile(path).then((rows) => {
    // skip header
    rows.shift();

    let tutorials = [];

    rows.forEach((row) => {
      let tutorial = {
        username: row[0],
        password: row[1],
        role: row[2],
      };
      tutorials.push(tutorial);
    });
    prisma.user2
      .createMany({
        data: {
          username: tutorials[i].username,
          password: tutorials[i].password,
          role: tutorials[i].role,
          refresh_token: "",
        },
      })
      .then(() => {
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const getTutorials = async (req, res) => {
  prisma.user
    .findMany()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
