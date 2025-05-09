import { axiosInstance } from "./axiosInstance";

//register new account
export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//login account
export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// check current user
export const checkCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/get-current-user", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
