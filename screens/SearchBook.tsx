import { StyleSheet, View, Text, Alert } from "react-native";
import { colors } from "../constants/Colors";
import { useState, useContext, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";

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

// apis
import { getWishlistById, addWishlist, deleteWishlist } from "../apis/wishlist";
import { getWithURI } from "../apis/data4library";
import { getRecommendByBook, getRecommendByUser } from "../apis/recommend";

import { SearchBookScreenProps } from "../types";
import React from "react";

// context
import UserContext from "../context/userContext";

export default function SearchBook({
  navigation,
  route,
}: SearchBookScreenProps) {
  const [menuNum, setMenuNum] = useState(0);

  const handleMenuNum = (num: number) => {
    setMenuNum(num);
  };
  const [recommendByBookData, setRecommendByBookData] = useState([]);

  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);

  const { user, logoutUser } = useContext(UserContext);

  const [searchValue, setSearchValue] = useState<string>("");
  const [isbn_list, setIsbnList] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState([]);

  const handleSearchBookResult = () => {
    navigation.navigate("SearchBookResult", {
      bookName: searchValue,
      wishlist: wishlist,
      // wishlist: wishlist,
      // getWishlist: getWishlist,
    });
  };

  const handleAddWishlist = (userId: string, book_isbn: number) => {
    addWishlist(userId, book_isbn);
    // setWishlist((prev) => [...prev, { isbn: book_isbn }]);
  };

  const handleDeleteWishlist = (userId: string, book_isbn: number) => {
    deleteWishlist(userId, book_isbn);
    // setWishlist((prev) => prev.filter((item) => item.isbn !== book_isbn));
  };

  // API function - 6. 도서 상세 조회
  const getBookDetail = async (bookIsbn: number) => {
    return getWithURI(
      `http://data4library.kr/api/srchDtlList?authKey=${AUTHKEY}&isbn13=${bookIsbn}&loaninfoYN=Y&displayInfo=gender&format=json`
    );
  };

  // const checkIsWishlist = (isbn: number) => {
  //   // if isbn is in wishlist, return true
  //   // else return false

  //   wishlist.forEach((item) => {
  //     if (item.isbn13 === Number(isbn)) return true;
  //   });
  //   return false;
  // };

  useFocusEffect(
    useCallback(() => {
      setRecommendByBookData([]);
      setIsbnList([]);
      setIsWishlistLoaded(false);
      console.log("user_id", user.user_id);
      let isbnList = [];

      getWishlistById(user.user_id).then((data) => {
        setWishlist(data);
      });
      // data.map((item) => {
      //   let bookIsbn = Number(item.isbn);
      //   console.log("bookIsbn", bookIsbn);
      //   isbnList.push(bookIsbn);
      // });
      // getRecommendByBook(isbnList)
      //   .then((data) => {
      //     setRecommendByBookData(data);
      //     console.log("recommendByBookData", data);
      //   })
      //   .catch((err) => {
      //     console.log("err", err);
      //     setRecommendByBookData([]);
      //   });

      // setWishlist(wishlistData);

      // order by created_at

      // updatedWishlistData.sort((a, b) => {
      //   return a.book_isbn - b.book_isbn;
      // });

      // setWishlistData([...updatedWishlistData]);

      // console.log("wishlistdata", recommendByBookData);
      // console.log("wishlistdata length", recommendByBookData.length);

      setTimeout(() => {
        setIsWishlistLoaded(true);

        console.log("isWishlistLoaded", isWishlistLoaded);
        console.log("wishlist", wishlist);
      }, 2000);
    }, [])
  );

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
      {!isWishlistLoaded ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16 }}>불러오는 중...</Text>
        </View>
      ) : isWishlistLoaded && recommendByBookData.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16 }}>찜을 한 도서가 없습니다.</Text>
        </View>
      ) : (
        <BookSection
          books={recommendByBookData}
          isSearchResult={false}
          isFromBookResult={true}
          isDetail={false}
          addWishlist={handleAddWishlist}
          deleteWishlist={handleDeleteWishlist}
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
