import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router/route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// router
app.use("/api",router);

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});