import { StyleSheet, View, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../constants/Colors";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// components
import SearchBar from "../components/SearchBar/SearchBar";
import RecommendHeader from "../components/Header/Recommend";
import BookItem from "../components/Books/BookItem";
import BookSection from "../components/Books/BookSection";

const DetailHeader = styled.TouchableOpacity`
  flex-direction: row;
  width: 170px;
  height: 50px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin: 10px 220px 0 0;
  padding-left: 30px;
`;

// types
import { SearchBookResultScreenProps } from "../types";
import { BookProps } from "../components/Books/types";

// react-query
import { useQuery } from "react-query";

// axios
import axios from "axios";
import React from "react";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

export default function SearchBookResult({
  navigation,
  route,
}: SearchBookResultScreenProps) {
  const [bookName, setBookName] = useState<string>(route.params.bookName);

  // // data
  // const books = [
  //   {
  //     book_isbn: 1,
  //     book_name: "노인과 바다",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url: "../assets/images/book-sample-img.png",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 2,
  //     book_name: "책책책",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url: "../assets/images/book-sample-img.png",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 3,
  //     book_name: "마법천자문",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url: "../assets/images/book-sample-img.png",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 4,
  //     book_name: "이것이 자바다",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url: "../assets/images/book-sample-img.png",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 5,
  //     book_name: "파이썬 코딩 인터뷰",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url: "../assets/images/book-sample-img.png",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  //   {
  //     book_isbn: 6,
  //     book_name: "book",
  //     book_publisher: "출판사아",
  //     book_author: "헤밍웨이",
  //     book_image_url: "../assets/images/book-sample-img.png",
  //     book_rating: 4.5,
  //     book_description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
  //     is_wishlist: false,
  //   },
  // ];

  const [keywordBooks, setKeywordBooks] = useState<Array<BookProps>>();

  // API function - 16. 도서 검색
  const fetchBookWithKeyword = async (bookName: string) => {
    const response = await axios.get(
      `http://data4library.kr/api/srchBooks?authKey=${AUTHKEY}&keyword=${bookName}&pageNo=1&pageSize=1000&format=json`
    );
    return response.data;
  };

  // react-query - GET_BOOKS_WITH_KEYWORD
  const { data, isLoading, isError, refetch } = useQuery(
    "GET_BOOKS_WITH_KEYWORD",
    () => fetchBookWithKeyword(bookName),
    {
      onSuccess: (data) => {
        const books = data.response.docs;
        const keywordBooks: Array<BookProps> = [];

        books.forEach((item: any) => {
          if (keywordBooks.length >= 20) {
            // 최대 20개 까지만
            return;
          }

          const bookInfo = item.doc;
          keywordBooks.push({
            book_isbn: bookInfo.isbn13,
            book_name: bookInfo.bookname,
            book_author: bookInfo.authors,
            book_publisher: bookInfo.publisher,
            book_image_url: bookInfo.bookImageURL,
            book_rating: 4.5,
            is_wishlist: false,
          });
        });

        setKeywordBooks([...keywordBooks]);
      },
    }
  );

  const onPressWishlist = (book_isbn: number) => {
    setKeywordBooks(
      keywordBooks?.map((book) =>
        book.book_isbn === book_isbn
          ? { ...book, is_wishlist: !book.is_wishlist }
          : book
      )
    );
  };

  useEffect(() => {
    alert(bookName);
  }, []);

  const handleSearchBookResult = () => {
    refetch();
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="도서명을 입력해주세요"
        searchValue={bookName}
        setSearchValue={setBookName}
        handleSearch={handleSearchBookResult}
      />
      {/* <DetailHeader
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "NotoSansKR_Bold",
            color: colors.semiblack,
          }}
        >
          도서 검색
        </Text>
      </DetailHeader> */}
      {keywordBooks?.length === 0 ? (
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
          books={keywordBooks}
          isSearchResult={true}
          isFromBookResult={true}
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
    paddingTop: 70,
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
