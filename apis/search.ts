import axios from "axios";

export const getSearchByBook = async (book_isbn: number) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/search/${book_isbn}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getSearchByUserId = async (user_id: string) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/search/${user_id}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const addSearch = async (user_id: string, book_isbn: number) => {
  try {
    const response = await axios.post(`http://43.200.106.28:4000/search/`, {
      userId: user_id,
      isbn: book_isbn,
    });
    return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteSearch = async (user_id: string, book_isbn: number) => {
  try {
    const response = await axios.delete(
      `http://43.200.106.28:4000/search/${user_id}/${book_isbn}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
