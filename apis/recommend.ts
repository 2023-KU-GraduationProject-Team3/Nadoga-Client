import axios from "axios";

export const getRecommendByBook = async (isbn_list: Array<Number>) => {
  try {
    const response = await axios.post(`http://54.180.64.128/api/content`, {
      isbn: isbn_list,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getRecommendByUser = async (userId: string) => {};
