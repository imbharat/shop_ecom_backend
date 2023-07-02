/**
 * always import reflect-metadata on the top
 */
import "reflect-metadata";
import "./entities/init/Init";
import "./container/Container";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import APIRouter from "./routes/APIRouter";
import ODataRouter from "./routes/ODataRouter";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api/v1", APIRouter);
app.use("/odata/v1", ODataRouter);

app.listen(4000);

export default app;
