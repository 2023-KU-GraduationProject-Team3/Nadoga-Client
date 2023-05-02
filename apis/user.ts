import axios, { AxiosError } from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://43.200.106.28:4000/user/login`, {
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    return false;
  }
};

export const signUp = async (userInfo: any) => {
  try {
    const response = await axios.post(
      `http://43.200.106.28:4000/user/sign-up`,
      {
        email: userInfo.email,
        password: userInfo.password,
        name: userInfo.name,
        gender: userInfo.gender,
        age: userInfo.age,
        genre: userInfo.genre,
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const emailCheck = async (email: string) => {
  try {
    const response = await axios.post(
      `http://43.200.106.28:4000/user/email-check`,
      {
        email: email,
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const updateUser = async (user_id: string, userInfo: any) => {
  try {
    const response = await axios.patch(
      `http://43.200.106.28:4000/user/update-up/${user_id}`,
      {
        email: userInfo.email,
        name: userInfo.name,
        age: userInfo.age,
        gender: userInfo.gender,
        genre: userInfo.genre,
      }
    );

    return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteUser = async (user_id: string) => {
  try {
    const response = await axios.delete(
      `http://43.200.106.28:4000/user/${user_id}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
