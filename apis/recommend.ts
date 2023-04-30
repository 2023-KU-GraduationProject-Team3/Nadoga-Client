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

export const getRecommendByUser = async (
  userId: string,
  result_num: number = 10
) => {
  try {
    const response = await axios.post(`http://54.180.64.128/api/collab`, {
      user_id: userId,
      result_num: result_num,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};
