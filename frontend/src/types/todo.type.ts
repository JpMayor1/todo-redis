export type Todo = {
  _id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

export type FilterType = "all" | "active" | "completed";

export type TodoStoreType = {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  loadingTodos: string[];

  getLoading: boolean;
  addLoading: boolean;
  toggleLoading: boolean;
  deleteLoading: boolean;

  getTodos: () => Promise<void>;
  addTodo: (text: string) => Promise<boolean>;
  toggleTodo: (id: string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;

  setFilter: (filter: "all" | "active" | "completed") => void;
};
