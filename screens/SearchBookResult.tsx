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

  // data : books
  const searchResult = [
    {
      book_isbn: 1,
      book_name: "노인과 바다1",
      book_publisher: "출판사아",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 2,
      book_publisher: "출판사아",
      book_name: "노인과 바다2",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 3,
      book_publisher: "출판사아",
      book_name: "노인과 바다3",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 4,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 5,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 6,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 7,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 8,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
    {
      book_isbn: 9,
      book_publisher: "출판사아",
      book_name: "노인과 바다",
      book_author: "헤밍웨이",
      book_image_url: "../assets/images/book-sample-img.png",
      book_rating: 4.5,
      book_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et orci eu mauris porta ornare. Suspendisse gravida justo ligula, sit amet condimentum mi fermentum ut. Quisque eget facilisis tellus. Integer vel consectetur risus. Donec volutpat ac massa id ultricies. Nulla facilisi. Praesent tincidunt scelerisque velit.",
    },
  ];

  useEffect(() => {
    console.log("bookName", bookName);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar placeholder="노인과 바다" />
      <RecommendHeader
        title={"SearchBookResult"}
        description={"도서 기록을 분석하여 추천하는 도서입니다."}
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
      />
      <BookSection books={searchResult} />
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