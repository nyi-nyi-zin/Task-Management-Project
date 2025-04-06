import { axiosInstance } from "./axiosInstance";

//create new board
export const createBoard = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-board", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//get all boards
export const fetchBoards = async () => {
  try {
    const response = await axiosInstance.get("/get-boards", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
