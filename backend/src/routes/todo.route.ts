import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "@/controllers/todo.controller";
import { Router } from "express";

const router = Router();

router.get("/all", getTodos);
router.post("/add", addTodo);
router.patch("/update/:id", updateTodo);
router.patch("/toggle/:id", toggleTodo);
router.delete("/delete/:id", deleteTodo);

export default router;
