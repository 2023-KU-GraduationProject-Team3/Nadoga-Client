export interface BookProps {
  book_isbn: number;
  book_name: string;
  book_author: string;
  book_publisher: string;
  book_image_url: string;
  book_rating: number;
  book_description?: string;
  is_wishlist: boolean;
  is_loanAvailable?: string;
  createdAt?: string;
}

export interface BookSectionProps {
  books: Array<BookProps>;
  bookName?: string;
  addWishlist?: (userId: string, bookIsbn: number) => void;
  deleteWishlist?: (userId: string, bookIsbn: number) => void;
}

export interface BookScreenProps {
  isSearchResult: boolean;
  isFromBookResult: boolean;
  libCode?: number;
  isDetail: boolean;
  onPressWishlist?: (bookIsbn: number) => void;
  addWishlist?: (userId: string, bookIsbn: number) => void;
  deleteWishlist?: (userId: string, bookIsbn: number) => void;
}
