import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
//import xlsx from "xlsx";
import cookieparser from "cookie-parser";
import DataDosenRoute from "./routes/DataDosen.js";
import UserRoute from "./routes/user.js";
import PenilaianRoute from "./routes/NilaiMahasiswa.js";

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser());
//app.use(xlsx());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/tes", async (req, res) => {
  const suhu = parseInt(req.body.suhu);
  if (suhu < 38 && suhu > 35) {
    res.json("Silahkan masukkk");
  } else {
    res.json("Maaf anda sedang sakit");
  }
});

app.use(DataDosenRoute);
app.use(UserRoute);
app.use(PenilaianRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`port`, process.env.APP_PORT);
});
