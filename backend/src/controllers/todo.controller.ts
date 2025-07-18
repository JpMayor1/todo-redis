import { errorHandler } from "@/helpers/errorHandler";
import Todo from "@/models/todo.model";
import redis from "@/redis/redis";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
  try {
    // Get pagination parameters from the query
    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string) || 20; // Default to 20 items per page

    // Check if the todos are cached in Redis for this page and limit
    const cacheKey = `todos:${page}`;
    const cachedTodos = await redis.get(cacheKey);
    if (cachedTodos) {
      // If cached, return the cached data
      return res.status(200).json({ todos: JSON.parse(cachedTodos) });
    }

    // If not cached, fetch from MongoDB with pagination
    const todos = await Todo.find()
      .skip((page - 1) * limit) // Skip the previous pages' data
      .limit(limit); // Limit to the specified number of items per page

    // Cache the result in Redis with a TTL of 1 hour (3600 seconds)
    redis.setex(cacheKey, 3600, JSON.stringify(todos));

    return res.status(200).json({ todos });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const addTodo = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required." });

    const todoExisted = await Todo.findOne({ text });
    if (todoExisted)
      return res.status(409).json({ message: "Todo already exist." });

    const addedTodo = await Todo.create({ text });

    if (!addedTodo)
      return res.status(500).json({ message: "Error adding todo." });

    redis.del(`todos:${page}`);

    res.status(201).json({ message: "Todo added.", todo: addedTodo });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = req.query.page as string;
    const { text } = req.body;

    if (!id) return res.status(400).json({ message: "ID is required." });
    if (!text) return res.status(400).json({ message: "Text is required." });

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found." });

    redis.del(`todos:${page}`);

    res.status(200).json({ message: "Todo updated." });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = req.query.page as string;

    if (!id) return res.status(400).json({ message: "ID is requried." });

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }

    todo.completed = !todo.completed;

    const updatedTodo = await todo.save();

    redis.del(`todos:${page}`);

    res.status(200).json({
      message: todo.completed
        ? "Todo marked as completed"
        : "Todo marked as incomplete",
      todo: updatedTodo,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = req.query.page as string;

    if (!id) return res.status(400).json({ message: "ID is required." });

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found." });

    redis.del(`todos:${page}`);

    res.status(200).json({ message: "Todo deleted." });
  } catch (error) {
    errorHandler(error, res);
  }
};
