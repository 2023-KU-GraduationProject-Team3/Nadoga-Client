import axios from "axios";

export const getReviewByBook = async (book_isbn: number) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/review/isbn/${book_isbn}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getReviewStarByBook = async (book_isbn: number) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/review/algorithm/${book_isbn}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const getReviewByUserId = async (user_id: number) => {
  try {
    const response = await axios.get(
      `http://43.200.106.28:4000/review/id/${user_id}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export const addReview = async (
  user_id: string,
  rating: number,
  content: string,
  book_isbn: number
) => {
  try {
    const response = await axios.post(`http://43.200.106.28:4000/review`, {
      userId: user_id,
      rating,
      content,
      isbn: book_isbn,
    });

    return response.data;
  } catch (error) {
    return false;
  }
};

export const deleteReview = async (review_id: string) => {
  try {
    const response = await axios.delete(
      `http://43.200.106.28:4000/review/${review_id}`
    );
    return response.data;
  } catch (error) {
    return false;
  }
};
