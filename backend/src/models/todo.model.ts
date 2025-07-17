import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      unique: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model("Todo", todoSchema);

export default Todo;
