import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

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
  const [popularBooks, setPopularBooks] = useState();

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
      `http://data4library.kr/api/loanItemSrchByLib?authKey=${AUTHKEY}&libCode=${libCode}&format=json`
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
      const docs = data.response.docs;
      let popularBooks = [];
      docs.map((item) => {
        console.log("popular book item", item);

        const bookInfo = item.doc;
        if (popularBooks.length < 12) {
          popularBooks.push({
            book_isbn: bookInfo.isbn13,
            book_name: bookInfo.bookname,
            book_author: bookInfo.authors,
            book_publisher: bookInfo.publisher,
            book_rating: 4.5,
            book_image_url: bookInfo.bookImageURL,
            is_wishlist: false,
          });
        }
      });
      setPopularBooks([...popularBooks]);
    },
  });
  return (
    <View style={styles.container}>
      <Text>{`도서관코드:${libCode}`}</Text>
      <Text>{`도서관명:${libInfo?.libName}`}</Text>
      <Text>{`주소:${libInfo?.address}`}</Text>
      <Text>{`전화번호:${libInfo?.tel}`}</Text>
      <Text>{`fax:${libInfo?.fax}`}</Text>
      <Text>{`홈페이지:${libInfo?.homepage}`}</Text>
      <View style={styles.separator}></View>
      <PopularBooksHeader
        title={"인기 대출 도서"}
        description={"해당 도서관의 인기 대출 도서입니다."}
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
      <BookSection
        books={popularBooks}
        isSearchResult={false}
        isDetail={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
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
