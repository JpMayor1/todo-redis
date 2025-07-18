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

  getTodos: (page: number) => Promise<void>;
  addTodo: (text: string, page: number) => Promise<boolean>;
  toggleTodo: (id: string, page: number) => Promise<boolean>;
  deleteTodo: (id: string, page: number) => Promise<boolean>;

  setFilter: (filter: "all" | "active" | "completed") => void;
};
