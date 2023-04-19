import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// types
import {
  RootTabScreenProps,
  SearchLibraryDetailScreenProps,
  SearchLibraryScreenProps,
} from "../types";

import { BookProps } from "../components/Books/types";

// constants
import Layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// react-query
import { useQueries, useQuery } from "react-query";

// axios
import axios from "axios";

// apis
import { getWithURI } from "../apis/data4library";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// components
import PopularBooksHeader from "../components/Header/PopularBooksHeader";
import BookSection from "../components/Books/BookSection";

export default function SearchLibraryDetail({
  navigation,
  route,
}: SearchLibraryDetailScreenProps) {
  const libCode = route.params.libCode;
  const [libInfo, setLibInfo] = useState();
  const [popularBooks, setPopularBooks] = useState([]);

  const [user_age, setUserAge] = useState(25);
  const [user_gender, setUserGender] = useState(0); // 0 : 남성, 1 : 여성

  // useFocusEffect(
  //   useCallback(() => {
  //     // Do something when the screen is focused
  //     // setPopularBooks([]);
  //   }, [])
  // );

  // API function - 14. 도서관별 통합정보
  const fetchLibraryDetail = async () => {
    return getWithURI(
      `http://data4library.kr/api/extends/libSrch?authKey=${AUTHKEY}&format=json&libCode=${libCode}`
    );
  };

  // API function - 9. 도서관/지역별 인기대출 도서 조회
  const fetchPopularBook = async () => {
    // user의 나이별로, age(나이대)를 설정
    // 최대 9개 제공
    let age = 0;

    if (user_age >= 0 && user_age < 6) {
      // 영유아(0 - 5세)
      age = 0;
    } else if (user_age < 8) {
      // 유아(6 - 7세)
      age = 6;
    } else if (user_age < 14) {
      // 초등(8 - 13세)
      age = 8;
    } else if (user_age < 20) {
      // 청소년(14 - 19세)
      age = 14;
    } else if (user_age < 30) {
      // 20대
      age = 20;
    } else if (user_age < 40) {
      // 30대
      age = 30;
    } else if (user_age < 50) {
      // 40대
      age = 40;
    } else if (user_age < 60) {
      // 50대
      age = 50;
    } else {
      // 60대
      age = 60;
    }

    return getWithURI(
      `http://data4library.kr/api/loanItemSrchByLib?authKey=${AUTHKEY}&libCode=${libCode}&age=${age}&gender=${user_gender}&pageSize=12&pageNo=1&format=json`
    );
  };

  // react-query - GET_LIBRARY_DETAIL
  const getLibraryDetail = useQuery("GET_LIBRARY_DETAIL", fetchLibraryDetail, {
    onSuccess: (data) => {
      const libInfo = data.response.libs[0].lib.libInfo;
      setLibInfo({ ...libInfo });
    },
  });

  // API function - 11. 도서관별 도서 소장 여부 및 대출 가능여부 조회
  const getBookStatus = async (libCode: number, isbn13: number) => {
    return getWithURI(
      `http://data4library.kr/api/bookExist?authKey=${AUTHKEY}&libCode=${libCode}&isbn13=${isbn13}&format=json`
    );
  };

  // react-query - GET_POPULAR_BOOK
  const getPopularBook = useQuery("GET_POPULAR_BOOK", fetchPopularBook, {
    onSuccess: (data) => {
      const books = data.response.docs;
      const updatedPopularBooks: Array<BookProps> = [];

      // 인기 대출 목록 - 사용자의 나이와 성별에 맞게
      books.map((item: any) => {
        const bookInfo = item.doc;
        if (updatedPopularBooks.length < 12) {
          updatedPopularBooks.push({
            book_isbn: bookInfo.isbn13,
            book_name: bookInfo.bookname,
            book_author: bookInfo.authors,
            book_publisher: bookInfo.publisher,
            book_rating: 4.5,
            book_image_url: bookInfo.bookImageURL,
            is_wishlist: false,
          });
        } else {
          return;
        }
      });

      setPopularBooks([...updatedPopularBooks]);
    },
  });
  return (
    <View style={styles.container}>
      <PopularBooksHeader
        title={"도서관 상세정보"}
        description={"해당 도서관의 상세정보입니다."}
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
      <Text>{`도서관코드:${libCode}`}</Text>
      <Text>{`도서관명:${libInfo?.libName}`}</Text>
      <Text>{`주소:${libInfo?.address}`}</Text>
      <Text>{`전화번호:${libInfo?.tel}`}</Text>
      <Text>{`fax:${libInfo?.fax}`}</Text>
      <Text>{`홈페이지:${libInfo?.homepage}`}</Text>
      <View style={styles.separator}></View>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <PopularBooksHeader
          title={"인기 대출 도서"}
          description={`해당 도서관의 ${user_age + "세"} ${
            user_gender === 0 ? "남성" : "여성"
          } 인기대출목록입니다.`}
          titleTextStyle={{
            fontSize: 26,
            fontWeight: "900",
            color: colors.black,
            fontFamily: "NotoSansKR_Bold",
            paddingLeft: 20,
          }}
          descriptionTextStyle={{
            fontSize: 14,
            fontWeight: "normal",
            color: colors.black,
            fontFamily: "NotoSansKR_Regular",
            paddingLeft: 20,
          }}
        />

        {getPopularBook.isFetching ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Layout.window.width,
              height: Layout.window.height - 300,
              backgroundColor: colors.bgGray,
            }}
          >
            <Text>불러오는 중...</Text>
          </View>
        ) : (
          <BookSection
            books={popularBooks}
            isSearchResult={false}
            isDetail={false}
            isFromBookResult={false}
            libCode={libCode}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: colors.bgGray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: colors.bgGray,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
    backgroundColor: colors.bgGray,
  },
});
