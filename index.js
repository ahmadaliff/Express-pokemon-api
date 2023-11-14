import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import router from "./routes/index.js";

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Listening to Port : ${PORT}`);
});
