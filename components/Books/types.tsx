export interface BookProps {
  book_isbn: number;
  book_name: string;
  book_author: string;
  book_image_url: string;
  book_rating: number;
  book_publisher: string;
  book_description: string;
}

export interface BookSectionProps {
  books: Array<BookProps>;
}
