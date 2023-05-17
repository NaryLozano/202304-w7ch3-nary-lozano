import cors from "cors";
import "./loadEnvironments.js";
import express from "express";
import morgan from "morgan";

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(cors({ origin: allowedOrigins }));
app.disable("x-powered-by");

app.use(morgan("dev"));

export default app;
