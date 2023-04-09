import { useEffect, useState } from "react";
import React, { StyleSheet, View, Text } from "react-native";

// constants
import { colors } from "../constants/Colors";

// components
import MyInfo from "../components/Header/MyInfo";
import MyLibraryHeader from "../components/Header/MyLibraryHeader";
import BookSection from "../components/Books/BookSection";

// types
import { MyLibraryScreenProps } from "../types";

export default function MyLibrary({ navigation, route }: MyLibraryScreenProps) {
  const [menuNum, setMenuNum] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const handleMenuNum = (num: number) => {
    setMenuNum(num);
  };

  const handleModal = () => {
    setIsModal(true);
  };

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

  return (
    <View style={styles.container}>
      <MyInfo
        name="신성준"
        email="shinsj4653@gmail.com"
        profile_img_url="../../assets/images/icon.png"
        wishlist_num={10}
        search_num={10}
        nameTextStyle={styles.name}
        emailTextStyle={styles.email}
        menuNum={menuNum}
        handleMenuNum={handleMenuNum}
        handleModal={handleModal}
      />
      <MyLibraryHeader
        title={
          menuNum === 0 ? "찜목록" : menuNum === 1 ? "평가 목록" : "검색 목록"
        }
        description={
          menuNum === 0
            ? "찜하기를 누른 도서 목록입니다."
            : menuNum === 1
            ? "평가한 도서 목록입니다."
            : "검색한 도서 목록입니다."
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
      ></MyLibraryHeader>
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
  },
  name: {
    fontSize: 26,
    fontFamily: "NotoSansKR_Bold",
    color: colors.semiblack,
  },
  email: {
    fontSize: 12,
    fontFamily: "NotoSansKR_Bold",
    color: colors.gray4,
    marginTop: -25,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
