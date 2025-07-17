import axiosInstance from "../axios/axiosinstance";

export const getTodosApi = async () => {
  const response = await axiosInstance.get("/todo/all");
  return response;
};
export const addTodoApi = async (text: string) => {
  const response = await axiosInstance.post("/todo/add", { text });
  return response;
};

export const toggleTodoApi = async (id: string) => {
  const response = await axiosInstance.patch(`/todo/toggle/${id}`);
  return response;
};

export const deleteTodoApi = async (id: string) => {
  const response = await axiosInstance.delete(`/todo/delete/${id}`);
  return response;
};
