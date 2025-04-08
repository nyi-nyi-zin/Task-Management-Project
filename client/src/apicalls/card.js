import { axiosInstance } from "./axiosInstance";

// Create a new card
export const createCard = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-card", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch all cards
export const fetchAllCards = async (listId) => {
  try {
    const response = await axiosInstance.get(`/cards/${listId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return {
      isSuccess: false,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};

//fetch old cards title
export const fetchOldCardsTitle = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/old-cards/${cardId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update card title
export const updateCard = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/update-card/${payload.cardId}`,
      payload,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
