import styled from "styled-components/native";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/Colors";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

// types
import { SerachBookDetailScreenProps } from "../types";
import { BookProps } from "../components/Books/types";

// constants
import layout from "../constants/Layout";

// icons
import { Feather } from "@expo/vector-icons";

// components
import SearchBar from "../components/SearchBar/SearchBar";
import RecommendHeader from "../components/Header/Recommend";
import BookItem from "../components/Books/BookItem";
import BookSection from "../components/Books/BookSection";

const DetailHeader = styled.TouchableOpacity`
  flex-direction: row;
  width: 120px;
  height: 50px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin: 10px 220px 10px 0;
`;

const SearchLibraryContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 200px;
  height: 30px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin-bottom: 30px;
`;

const BookDescrptionContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: ${layout.window.width - 50}px;
  height: 400px;
  background-color: ${colors.bgGray};
`;

export default function SearchBookDetail({
  route,
  navigation,
}: SerachBookDetailScreenProps) {
  // data : books
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

  const [foundBook, setFoundBook] = useState<BookProps>();
  const [bookIsbn, setBookIsbn] = useState(route.params.bookIsbn);

  const onPressWishlist = (book_isbn: number) => {
    setFoundBook((prev) => {
      if (prev) {
        return {
          ...prev,
          is_wishlist: !prev.is_wishlist,
        };
      }
    });
  };

  useEffect(() => {
    // 검색어로 books 필터링
    const foundBook = books.find((book) => book.book_isbn === bookIsbn);
    setFoundBook(foundBook);
    console.log(foundBook);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar placeholder="노인과 바다" />
      <DetailHeader
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
          도서 정보
        </Text>
      </DetailHeader>
      <BookItem
        {...foundBook}
        isSearchResult={true}
        isDetail={true}
        onPressWishlist={onPressWishlist}
      />
      <SearchLibraryContainer>
        <Feather name="search" size={24} color="#000" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
            fontFamily: "NotoSansKR_Bold",
            color: colors.semiblack,
          }}
        >
          근처 도서관 찾기
        </Text>
      </SearchLibraryContainer>
      <BookDescrptionContainer>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "NotoSansKR_Bold",
            marginBottom: 10,
            color: colors.semiblack,
          }}
        >
          도서 설명
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "NotoSansKR_DemiLight",
            color: colors.gray4,
          }}
        >
          {foundBook?.book_description}
        </Text>
      </BookDescrptionContainer>
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
