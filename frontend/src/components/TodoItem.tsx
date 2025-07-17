import { Trash2 } from "lucide-react";
import React from "react";
import { useTodoStore } from "../stores/useTotoStore";
import LoadingSpinner from "./LoadingSpinner";

interface TodoItemProps {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ _id, text, completed }) => {
  const { toggleLoading, loadingTodos, toggleTodo, deleteTodo } =
    useTodoStore();
  return (
    <div className="group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      {loadingTodos.includes(_id) ? (
        <LoadingSpinner />
      ) : (
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTodo(_id)}
            className="sr-only"
            disabled={toggleLoading}
          />

          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              completed
                ? "bg-blue-500 border-blue-500 text-white"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            {completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </label>
      )}

      <span
        className={`flex-1 text-gray-800 transition-all duration-200 ${
          completed ? "line-through text-gray-500" : ""
        }`}
      >
        {text}
      </span>

      <button
        onClick={() => deleteTodo(_id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all duration-200"
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TodoItem;
