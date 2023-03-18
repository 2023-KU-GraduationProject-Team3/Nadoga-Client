export interface BookProps {
  book_isbn: number;
  book_name: string;
  book_author: string;
  book_publisher: string;
  book_image_url: string;
  book_rating: number;
  book_description?: string;
  is_wishlist: boolean;
}

export interface BookSectionProps {
  books: Array<BookProps>;
  bookName?: string;
}

export interface BookScreenProps {
  isSearchResult: boolean;
  isFromBookResult: boolean;
  isDetail: boolean;
  onPressWishlist?: (bookIsbn: number) => void;
}
