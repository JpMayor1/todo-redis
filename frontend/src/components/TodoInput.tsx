import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useTodoStore } from "../stores/useTotoStore";
import LoadingSpinner from "./LoadingSpinner";

const TodoInput: React.FC = () => {
  const { addTodo, addLoading } = useTodoStore();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      addTodo(trimmedValue);
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-3 pr-12 text-gray-800 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Plus className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <button
        type="submit"
        disabled={addLoading || !inputValue.trim()}
        className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {addLoading ? <LoadingSpinner /> : "Add Task"}
      </button>
    </form>
  );
};

export default TodoInput;
