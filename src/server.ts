import config from "./config";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routers";

// import { databaseConnecting } from './config/database.config';
const app: Application = express();

app.use(express.json());
app.use(cors());

// databaseConnecting();

app.listen(config.PORT, () => {
  console.log(
    `Example app listening on  ${config.PORT} goto live 👉 http://localhost:${config.PORT}/`
  );
});

const startServer = (req: Request, res: Response) => {
  try {
    res.send(`${config.WELCOME_MESSAGE}`);
  } catch (error) {
    console.log("server not start");
  }
};

// app.use("/api/v1/user", userRoutes);

app.use('/api/v1', router);

app.get("/", startServer);
