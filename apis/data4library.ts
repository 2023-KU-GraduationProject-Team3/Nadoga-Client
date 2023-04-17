import axios, { AxiosError } from "axios";

export const getWithURI = async (url: string) => {
  try {
    const response = await axios.post("http://43.200.106.28:4000/library", {
      url: url,
    });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    return false;
  }
};
