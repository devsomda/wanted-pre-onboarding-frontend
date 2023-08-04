import axios from 'axios';

const baseURL = 'https://www.pre-onboarding-selection-task.shop';

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