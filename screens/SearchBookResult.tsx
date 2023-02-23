import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/Colors";
import { useState, useEffect } from "react";

// components
import SearchBar from "../components/SearchBar/SearchBar";
import RecommendHeader from "../components/Header/Recommend";
import BookItem from "../components/Books/BookItem";
import BookSection from "../components/Books/BookSection";

import { SearchBookResultScreenProps } from "../types";

export default function SearchBookResult({
  navigation,
  route,
}: SearchBookResultScreenProps) {
  const { bookName } = route.params;

  // data
  const books = [
    {
      book_isbn: 1,
      book_name: "노인과 바다",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 2,
      book_name: "책책책",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 3,
      book_name: "마법천자문",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 4,
      book_name: "이것이 자바다",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 5,
      book_name: "파이썬 코딩 인터뷰",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 6,
      book_name: "book",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
  ];

  const [filteredBooks, setFilteredBooks] = useState(books);

  const onPressWishlist = (book_isbn: number) => {
    setFilteredBooks(
      filteredBooks.map((book) =>
        book.book_isbn === book_isbn
          ? { ...book, is_wishlist: !book.is_wishlist }
          : book
      )
    );
  };

  useEffect(() => {
    console.log(bookName);

    // 검색어로 books 필터링
    setFilteredBooks(books.filter((book) => book.book_name.includes(bookName)));
    console.log(filteredBooks);
  }, [bookName]);

  return (
    <View style={styles.container}>
      <SearchBar placeholder="노인과 바다" />

      {filteredBooks.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>검색 결과가 없습니다.</Text>
        </View>
      ) : (
        <BookSection
          books={filteredBooks}
          isSearchResult={true}
          isDetail={false}
          bookName={bookName}
          onPressWishlist={onPressWishlist}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
    marginTop: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
