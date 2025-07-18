import { CheckSquare } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner";
import TodoFilter from "./components/TodoFilter";
import TodoInput from "./components/TodoInput";
import TodoItem from "./components/TodoItem";
import { useTodoStore } from "./stores/useTotoStore";

function App() {
  const { getTodos, getLoading, todos, filter, setFilter } = useTodoStore();
  const [page, setPage] = useState(1); // Initial page

  useEffect(() => {
    // Fetch todos when page or loadingMore changes
    const fetchTodos = async () => {
      await getTodos(page);
    };
    fetchTodos();
  }, [getTodos, page]);

  const handleScroll = () => {
    // If the user scrolls to the bottom, load more to-dos
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1); // Go to the next page
    }
  };

  // Detect when the user reaches the bottom of the page
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const taskCounts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.completed).length,
      completed: todos.filter((todo) => todo.completed).length,
    }),
    [todos]
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">TodoFlow</h1>
          </div>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Input Section */}
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <TodoInput page={page} />
        </div>

        {/* Filter Section */}
        {taskCounts.all > 0 && (
          <div className="mb-6">
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <CheckSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-500 mb-2">
                {filter === "all"
                  ? "No tasks yet"
                  : filter === "active"
                  ? "No active tasks"
                  : "No completed tasks"}
              </h3>
              <p className="text-gray-400">
                {filter === "all"
                  ? "Add your first task to get started!"
                  : filter === "active"
                  ? "All tasks are completed!"
                  : "Complete some tasks to see them here."}
              </p>
            </div>
          ) : (
            <>
              {/* Task Summary */}
              {taskCounts.all > 0 && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Total: {taskCounts.all} tasks</span>
                    <span>
                      {taskCounts.completed > 0 &&
                        `${Math.round(
                          (taskCounts.completed / taskCounts.all) * 100
                        )}% complete`}
                    </span>
                  </div>

                  {taskCounts.completed > 0 && (
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (taskCounts.completed / taskCounts.all) * 100
                          }%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {filteredTodos.map((todo, index) => (
                <TodoItem key={index} todo={todo} page={page} />
              ))}
            </>
          )}
          {getLoading && <LoadingSpinner />}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
