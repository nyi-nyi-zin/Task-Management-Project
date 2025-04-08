import { axiosInstance } from "./axiosInstance";

//create new list
export const createNewList = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-list", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//get all lists
export const getAllLists = async (boardId) => {
  try {
    const response = await axiosInstance.get(`/get-lists/${boardId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//update list
export const updateList = async (payload) => {
  console.log("Updating list with payload:", payload);
  try {
    const response = await axiosInstance.put(
      `/update-list/${payload.listId}`,
      { title: payload.title },
      {
        validateStatus: () => true,
      }
    );
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in updateList API call:", error);
    throw error.response?.data || error;
  }
};

//fetch old list title
export const getOldListTitle = async (listId) => {
  try {
    const response = await axiosInstance.get(`/get-old-list-title/${listId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//delete list
export const deleteList = async (listId) => {
  try {
    const response = await axiosInstance.delete(`/delete-list/${listId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
