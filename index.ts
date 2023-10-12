import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import scrapeRouter from "./routes/scrapeRouter";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/", scrapeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
