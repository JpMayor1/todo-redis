import { Response } from "express";

export function errorHandler(err: any, res: Response) {
  console.error("Internal Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
}
