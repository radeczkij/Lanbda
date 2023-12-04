import express from "express";
import {createRouter} from "./routes/router"
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express();
const router = createRouter();
app.use(express.json());
app.use("/", router);




app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`);
});