import express from "express";
import cors from "cors";
import apiRouter from "./api/index.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Hello, Concept Nexus!");
});

export default app;