import axios, { AxiosError } from "axios";

export const getWishlistById = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/wishlist/${userId}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
