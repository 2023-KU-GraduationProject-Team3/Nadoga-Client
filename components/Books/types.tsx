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
}

export interface BookSectionProps {
  books: Array<BookProps>;
  bookName?: string;
}

export interface BookScreenProps {
  isSearchResult: boolean;
  isFromBookResult: boolean;
  libCode?: number;
  isDetail: boolean;
  onPressWishlist?: (bookIsbn: number) => void;
}
