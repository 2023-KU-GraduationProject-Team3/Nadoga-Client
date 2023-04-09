import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/Colors";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// components
import SearchBar from "../components/SearchBar/SearchBar";
import RecommendHeader from "../components/Header/Recommend";
import BookItem from "../components/Books/BookItem";
import BookSection from "../components/Books/BookSection";

// react-query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

import { SearchBookScreenProps } from "../types";

export default function SearchBook({
  navigation,
  route,
}: SearchBookScreenProps) {
  // recommend Result
  const recommendResult = [
    {
      book_isbn: 9791133469727,
      book_name: "노인과 바다1",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791130635712,
      book_publisher: "출판사아",
      book_name: "노인과 바다2",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791164137176,
      book_publisher: "출판사아",
      book_name: "노인과 바다3",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791133469727,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791164137879,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791130637594,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791161722344,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 9791188862290,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
    {
      book_isbn: 8809264181522,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url:
        "https://image.aladin.co.kr/product/5006/34/cover150/1185564233_1.jpg",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
      is_wishlist: false,
    },
  ];

  const [menuNum, setMenuNum] = useState(0);

  const handleMenuNum = (num: number) => {
    setMenuNum(num);
  };

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchBookResult = () => {
    navigation.navigate("SearchBookResult", {
      bookName: searchValue,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="도서명을 입력해주세요."
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearchBookResult}
      />
      <RecommendHeader
        title={"추천 도서"}
        description={
          menuNum === 0
            ? "찜 목록을 분석하여 추천한 도서 결과입니다."
            : "평점 목록을 분석하여 추천한 도서 결과입니다."
        }
        titleTextStyle={{
          fontSize: 26,
          fontWeight: "900",
          color: colors.black,
          fontFamily: "NotoSansKR_Bold",
        }}
        descriptionTextStyle={{
          fontSize: 14,
          fontWeight: "normal",
          color: colors.black,
          fontFamily: "NotoSansKR_Regular",
        }}
        menuNum={menuNum}
        handleMenuNum={handleMenuNum}
      />
      <BookSection
        books={recommendResult}
        isSearchResult={false}
        isFromBookResult={true}
        isDetail={false}
      />
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
