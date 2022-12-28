import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import DataDosenRoute from "./routes/DataDosen.js";
import UserRoute from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(process.env.APP_PORT, () => {
  console.log(`port`, process.env.APP_PORT);
});
