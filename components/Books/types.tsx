export interface BookProps {
  book_isbn: number;
  book_name: string;
  book_author: string;
  book_image_url: string;
  book_rating: number;
  book_publisher: string;
  book_description: string;
  is_wishlist: boolean;
}
export interface BookScreenProps {
  isSearchResult: boolean;
  isDetail: boolean;
  onPressWishlist: (bookIsbn: number) => void;
}

export interface BookSectionProps {
  books: Array<BookProps>;
  bookName?: string;
}
