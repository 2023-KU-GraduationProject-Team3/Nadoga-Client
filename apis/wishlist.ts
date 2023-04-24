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

export const getIsWishlist = async (userId: string, book_isbn: number) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/wishlist/${userId}/${book_isbn}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const addWishlist = async (userId: string, book_isbn: number) => {
  try {
    const response = await axios.post(`http:///43.200.106.28:4000/wishlist`, {
      user_id: userId,
      isbn: book_isbn,
    });
  } catch (error) {
    return false;
  }
};

export const deleteWishlist = async (userId: string, book_isbn: number) => {
  try {
    const response = await axios.delete(
      `http:///43.200.106.28:4000/wishlist/${userId}/${book_isbn}`
    );
  } catch (error) {
    return false;
  }
};
