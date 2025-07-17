import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import morgan from "morgan";
import "tsconfig-paths/register";

import connectToMongoDB from "@/db/db.connect";
import todoRoute from "@/routes/todo.route";
import createTestTodos from "./helpers/createRodos";
import redisClient from "./redis/redis";

const PORT = process.env.PORT || 5000;
const app = express();

const origins = process.env.CORS_ORIGINS
  ? JSON.parse(process.env.CORS_ORIGINS)
  : [];
app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json("Server is running.");
});

app.use("/api/todo", todoRoute);

const startServer = async () => {
  try {
    await connectToMongoDB();
    redisClient;
    await createTestTodos();
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
