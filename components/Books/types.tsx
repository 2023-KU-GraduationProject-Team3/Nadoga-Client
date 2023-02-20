export interface BookProps {
  book_isbn: number;
  book_name: string;
  book_author: string;
  book_image_url: string;
  book_rating: number;
}

export interface BookSectionProps {
  data: Array<BookProps>;
}
