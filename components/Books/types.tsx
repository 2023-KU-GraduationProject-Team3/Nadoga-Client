export interface BookProps {
  isbn13: number;
  bookname: string;
  authors: string;
  publisher: string;
  bookImageURL: string;
  bookRating: number;
  bookDescription?: string;
  isWishlist: boolean;
  isLoanAvailable?: string;
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
