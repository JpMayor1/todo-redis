import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import {
  addTodoApi,
  deleteTodoApi,
  getTodosApi,
  toggleTodoApi,
} from "../api/todo.api";
import { TodoStoreType } from "../types/todo.type";

export const useTodoStore = create<TodoStoreType>((set) => ({
  todos: [],
  filter: "all",
  loadingTodos: [],

  getLoading: false,
  addLoading: false,
  toggleLoading: false,
  deleteLoading: false,

  getTodos: async () => {
    set({ getLoading: true });
    try {
      const res = await getTodosApi();
      set({ todos: res.data.todos });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.message ||
          "An error occurred while getting all todos.";
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ getLoading: false });
    }
  },

  addTodo: async (text: string) => {
    set({ addLoading: true });
    try {
      const res = await addTodoApi(text);
      set((state) => ({ todos: [...state.todos, res.data.todo] }));
      toast.success(res.data.message);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.message ||
          "An error occurred while adding the todo.";
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
      return false;
    } finally {
      set({ addLoading: false });
    }
  },

  toggleTodo: async (id) => {
    set({ toggleLoading: true });
    set((state) => ({
      loadingTodos: [...state.loadingTodos, id],
    }));
    try {
      const res = await toggleTodoApi(id);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      }));
      toast.success(res.data.message);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.message ||
          "An error occurred while updating the todo.";
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
      return false;
    } finally {
      set({ toggleLoading: false });
      set((state) => ({
        loadingTodos: state.loadingTodos.filter((todo) => todo !== id),
      }));
    }
  },

  deleteTodo: async (id: string) => {
    set({ deleteLoading: true });
    try {
      const res = await deleteTodoApi(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
      }));
      toast.success(res.data.message);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.message ||
          "An error occurred while deleting the todo.";
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
      return false;
    } finally {
      set({ deleteLoading: false });
    }
  },

  setFilter: (filter) => set({ filter }),
}));
