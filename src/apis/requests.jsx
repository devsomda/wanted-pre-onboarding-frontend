import axios from "axios";
import { async } from "q";

const baseURL = "https://www.pre-onboarding-selection-task.shop";

const getJWT = () => {
  return localStorage.getItem("token");
};

export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signup`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/signin`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (todo) => {
  const token = getJWT();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      `${baseURL}/todos`,
      {
        todo: todo,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodo = async (todo) => {
  const token = getJWT();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(`${baseURL}/todos`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTodo = async (todo, isCompleted, id) => {
  const token = getJWT();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.put(
      `${baseURL}/todos/${id}`,
      {
        todo: todo,
        isCompleted: isCompleted,
      },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id) => {
  const token = getJWT();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`${baseURL}/todos/${id}`, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
