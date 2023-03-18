import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";

// types
import {
  RootTabScreenProps,
  SearchLibraryDetailScreenProps,
  SearchLibraryScreenProps,
} from "../types";

// constants
import Layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// react-query
import { useQueries, useQuery } from "react-query";

// axios
import axios from "axios";

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
  const [libCode, setLibCode] = useState(route.params.libCode);
  const [libInfo, setLibInfo] = useState();
  const [popularBooks, setPopularBooks] = useState({
    age6Books: [],
    age8Books: [],
    age14Books: [],
    age20Books: [],
  });

  // API function - 도서관 상세정보 조회
  const fetchLibraryDetail = async () => {
    const response = await axios.get(
      `http://data4library.kr/api/extends/libSrch?authKey=${AUTHKEY}&format=json&libCode=${libCode}`
    );
    return response.data;
  };

  // API function - 도서관 인기대출 도서 조회
  const fetchPopularBook = async () => {
    const response = await axios.get(
      `http://data4library.kr/api/extends/loanItemSrchByLib?authKey=${AUTHKEY}&libCode=${libCode}&format=json`
    );
    return response.data;
  };

  // react-query - GET_LIBRARY_DETAIL
  const getLibraryDetail = useQuery("GET_LIBRARY_DETAIL", fetchLibraryDetail, {
    onSuccess: (data) => {
      const libInfo = data.response.libs[0].lib.libInfo;
      setLibInfo({ ...libInfo });
    },
  });

  // react-query - GET_POPULAR_BOOK
  const getPopularBook = useQuery("GET_POPULAR_BOOK", fetchPopularBook, {
    onSuccess: (data) => {
      const age6Books = data.response.age6Books;
      const age8Books = data.response.age8Books;
      const age14Books = data.response.age14Books;
      const age20Books = data.response.age20Books;

      let age6Popular = [];
      let age8Popular = [];
      let age14Popular = [];
      let age20Popular = [];

      // 유아 인기 대출 목록
      age6Books.map((item) => {
        console.log("age 6", item);

        const bookInfo = item.book;
        if (age6Popular.length < 6) {
          age6Popular.push({
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

      // 초등 인기 대출 목록
      age8Books.map((item) => {
        console.log("age 8", item);

        const bookInfo = item.book;
        if (age8Popular.length < 6) {
          age8Popular.push({
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

      // 청소년 인기 대출 목록
      age14Books.map((item) => {
        console.log("age 14", item);

        const bookInfo = item.book;
        if (age14Popular.length < 6) {
          age14Popular.push({
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

      // 성인 인기 대출 목록
      age20Books.map((item) => {
        console.log("age 20", item);

        const bookInfo = item.book;
        if (age20Popular.length < 6) {
          age20Popular.push({
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

      setPopularBooks({
        age6Books: age6Popular,
        age8Books: age8Popular,
        age14Books: age14Popular,
        age20Books: age20Popular,
      });
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
          title={"인기 대출 도서 - 유아"}
          description={"해당 도서관의 영유아 인기대출목록입니다."}
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
        {getPopularBook.isLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Layout.window.width,
              height: Layout.window.height - 50,
              backgroundColor: colors.green,
            }}
          >
            <Text>불러오는 중...</Text>
          </View>
        ) : (
          <BookSection
            books={[...popularBooks.age6Books]}
            isSearchResult={false}
            isDetail={false}
            isFromBookResult={false}
          />
        )}

        <PopularBooksHeader
          title={"인기 대출 도서 - 초등"}
          description={"해당 도서관의 초등 인기대출목록입니다."}
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
        {getPopularBook.isLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Layout.window.width,
              height: Layout.window.height - 50,
              backgroundColor: colors.green,
            }}
          >
            <Text>불러오는 중...</Text>
          </View>
        ) : (
          <BookSection
            books={[...popularBooks.age6Books]}
            isSearchResult={false}
            isDetail={false}
            isFromBookResult={false}
          />
        )}

        <PopularBooksHeader
          title={"인기 대출 도서 - 청소년"}
          description={"해당 도서관의 청소년 인기대출목록입니다."}
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
        {getPopularBook.isLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Layout.window.width,
              height: Layout.window.height - 50,
              backgroundColor: colors.green,
            }}
          >
            <Text>불러오는 중...</Text>
          </View>
        ) : (
          <BookSection
            books={[...popularBooks.age6Books]}
            isSearchResult={false}
            isDetail={false}
            isFromBookResult={false}
          />
        )}

        <PopularBooksHeader
          title={"인기 대출 도서 - 성인"}
          description={"해당 도서관의 성인 인기대출목록입니다."}
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
        {getPopularBook.isLoading ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: Layout.window.width,
              height: Layout.window.height - 50,
              backgroundColor: colors.green,
            }}
          >
            <Text>불러오는 중...</Text>
          </View>
        ) : (
          <BookSection
            books={[...popularBooks.age6Books]}
            isSearchResult={false}
            isDetail={false}
            isFromBookResult={false}
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
