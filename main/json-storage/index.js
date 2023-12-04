import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import router from "./routes/router.js";
import createRouter from "./routes/router.js";
dotenv.config();

const app = express();
const router = createRouter();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    mongoose.set("strictQuery", false);

    mongoose.connect(process.env.DB_URL);
  } catch (e) {
    console.log(e);
  }
};

start();
