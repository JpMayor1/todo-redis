import axiosInstance from "../axios/axiosinstance";

export const getTodosApi = async (page: number) => {
  const response = await axiosInstance.get(
    `/todo/all?page=${page}?limit=${20}`
  );
  return response;
};

export const addTodoApi = async (text: string, page: number) => {
  const response = await axiosInstance.post(`/todo/add?page=${page}`, { text });
  return response;
};

export const toggleTodoApi = async (id: string, page: number) => {
  const response = await axiosInstance.patch(`/todo/toggle/${id}?page=${page}`);
  return response;
};

export const deleteTodoApi = async (id: string, page: number) => {
  const response = await axiosInstance.delete(
    `/todo/delete/${id}?page=${page}`
  );
  return response;
};
