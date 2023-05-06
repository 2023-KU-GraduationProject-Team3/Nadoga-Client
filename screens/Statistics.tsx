import { useEffect, useState, useCallback, useContext } from "react";
import React, {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import styled from "styled-components/native";

// icons
import { Ionicons } from "@expo/vector-icons";
// constants
import layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// components

const DetailHeader = styled.TouchableOpacity`
  flex-direction: row;
  width: 170px;
  height: 50px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin: 10px 220px 0 0;
  padding-left: 30px;
`;
import GenreResult from "../components/statistics/GenreResult";

// types
import { StatisticsScreenProps } from "../types";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// apis
import { getReviewRankByUserId, getReviewByUserId } from "../apis/review";
import { getSearchByUserId } from "../apis/search";
import { getWishlistById } from "../apis/wishlist";
import { getWithURI } from "../apis/data4library";

// useContext
import UserContext from "../context/userContext";

// react-query
import { useQuery } from "react-query";

// chart
import { PieChart, StackedBarChart } from "react-native-chart-kit";

export default function Statistics({
  navigation,
  route,
}: StatisticsScreenProps) {
  const { user } = useContext(UserContext);
  const [rankInfo, setRankInfo] = useState(null);

  const [wishlist, setWishlist] = useState(null);
  const [review, setReview] = useState(null);
  const [search, setSearch] = useState(null);
  const [tier, setTier] = useState("Bronze");

  const [genre, setGenre] = useState({
    wishlist: {
      총류: 0,
      철학: 0,
      종교: 0,
      사회과학: 0,
      자연과학: 0,
      기술과학: 0,
      예술: 0,
      언어: 0,
      문학: 0,
      역사: 0,
    },
    review: {
      총류: 0,
      철학: 0,
      종교: 0,
      사회과학: 0,
      자연과학: 0,
      기술과학: 0,
      예술: 0,
      언어: 0,
      문학: 0,
      역사: 0,
    },
    search: {
      총류: 0,
      철학: 0,
      종교: 0,
      사회과학: 0,
      자연과학: 0,
      기술과학: 0,
      예술: 0,
      언어: 0,
      문학: 0,
      역사: 0,
    },
  });
  const [wishlistGenre, setWishlistGenre] = useState([]);
  const [reviewGenre, setReviewGenre] = useState([]);
  const [searchGenre, setSearchGenre] = useState([]);

  const [isStatisticsLoaded, setIsStatisticsLoaded] = useState(false);

  // API function - 6. 도서 상세 조회
  const getBookDetail = async (bookIsbn: number) => {
    return getWithURI(
      `http://data4library.kr/api/srchDtlList?authKey=${AUTHKEY}&isbn13=${bookIsbn}&loaninfoYN=Y&displayInfo=gender&format=json`
    );
  };

  useEffect(() => {}, [wishlist, review, search]);

  const setGenreData = (flag: number, class_no: number) => {
    if (class_no < 100) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              총류: prev.wishlist.총류 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              총류: prev.review.총류 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              총류: prev.search.총류 + 1,
            },
          }));
    } else if (class_no < 200) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              철학: prev.wishlist.철학 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              철학: prev.review.철학 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              철학: prev.search.철학 + 1,
            },
          }));
    } else if (class_no < 300) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              종교: prev.wishlist.종교 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              종교: prev.review.종교 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              종교: prev.search.종교 + 1,
            },
          }));
    } else if (class_no < 400) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              사회과학: prev.wishlist.사회과학 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              사회과학: prev.review.사회과학 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              사회과학: prev.search.사회과학 + 1,
            },
          }));
    } else if (class_no < 500) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              자연과학: prev.wishlist.자연과학 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              자연과학: prev.review.자연과학 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              자연과학: prev.search.자연과학 + 1,
            },
          }));
    } else if (class_no < 600) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              기술과학: prev.wishlist.기술과학 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              기술과학: prev.review.기술과학 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              기술과학: prev.search.기술과학 + 1,
            },
          }));
    } else if (class_no < 700) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              예술: prev.wishlist.예술 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              예술: prev.review.예술 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              예술: prev.search.예술 + 1,
            },
          }));
    } else if (class_no < 800) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              언어: prev.wishlist.언어 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              언어: prev.review.언어 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              언어: prev.search.언어 + 1,
            },
          }));
    } else if (class_no < 900) {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              문학: prev.wishlist.문학 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              문학: prev.review.문학 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              문학: prev.search.문학 + 1,
            },
          }));
    } else {
      flag === 0
        ? setGenre((prev) => ({
            ...prev,
            wishlist: {
              ...prev.wishlist,
              역사: prev.wishlist.역사 + 1,
            },
          }))
        : flag === 1
        ? setGenre((prev) => ({
            ...prev,
            review: {
              ...prev.review,
              역사: prev.review.역사 + 1,
            },
          }))
        : setGenre((prev) => ({
            ...prev,
            search: {
              ...prev.search,
              역사: prev.search.역사 + 1,
            },
          }));
    }
    let wishlistGenre = Object.entries(genre.wishlist).sort(
      (a, b) => b[1] - a[1]
    );
    let reviewGenre = Object.entries(genre.review).sort((a, b) => b[1] - a[1]);
    let searchGenre = Object.entries(genre.search).sort((a, b) => b[1] - a[1]);

    console.log("genre data");
    setWishlistGenre([...wishlistGenre]);
    setReviewGenre([...reviewGenre]);
    setSearchGenre([...searchGenre]);
  };

  useFocusEffect(
    useCallback(() => {
      setWishlist([]);
      setReview([]);
      setSearch([]);
      setIsStatisticsLoaded(false);
      setRankInfo([]);
      setGenre({
        wishlist: {
          총류: 0,
          철학: 0,
          종교: 0,
          사회과학: 0,
          자연과학: 0,
          기술과학: 0,
          예술: 0,
          언어: 0,
          문학: 0,
          역사: 0,
        },
        review: {
          총류: 0,
          철학: 0,
          종교: 0,
          사회과학: 0,
          자연과학: 0,
          기술과학: 0,
          예술: 0,
          언어: 0,
          문학: 0,
          역사: 0,
        },
        search: {
          총류: 0,
          철학: 0,
          종교: 0,
          사회과학: 0,
          자연과학: 0,
          기술과학: 0,
          예술: 0,
          언어: 0,
          문학: 0,
          역사: 0,
        },
      });

      getReviewRankByUserId(user.user_id).then((res) => {
        setRankInfo(res);
      });

      Promise.all([
        getWishlistById(user.user_id),
        getReviewByUserId(user.user_id),
        getSearchByUserId(user.user_id),
      ])
        .then((values) => {
          values[0].map((item) => {
            let bookIsbn = Number(item.isbn);
            getBookDetail(bookIsbn).then((data) => {
              let book = data.response.detail[0].book;
              let bookDetail = {
                isbn13: book.isbn13,
                class_no: book.class_no,
                class_nm: book.class_nm,
              };

              setGenreData(0, Number(bookDetail.class_no));

              setWishlist((prev) => [...prev, bookDetail]);
            });
          });

          values[1].map((item) => {
            let bookIsbn = Number(item.isbn);
            getBookDetail(bookIsbn).then((data) => {
              let book = data.response.detail[0].book;
              let bookDetail = {
                isbn13: book.isbn13,
                class_no: book.class_no,
                class_nm: book.class_nm,
              };
              setGenreData(1, Number(bookDetail.class_no));

              setReview((prev) => [...prev, bookDetail]);
            });
          });

          values[2].map((item) => {
            let bookIsbn = Number(item.isbn);
            getBookDetail(bookIsbn).then((data) => {
              let book = data.response.detail[0].book;
              let bookDetail = {
                isbn13: book.isbn13,
                class_no: book.class_no,
                class_nm: book.class_nm,
              };
              setGenreData(2, Number(bookDetail.class_no));

              setSearch((prev) => [...prev, bookDetail]);
            });
          });

          if (values[1].length < 10) {
            setTier("Bronze");
          } else if (values[1].length < 30) {
            setTier("Silver");
          } else if (values[1].length < 50) {
            setTier("Gold");
          } else {
            setTier("Platinum");
          }
        })
        .then(() => {
          // now, sort the genre data by value
          let wishlistGenre = Object.entries(genre.wishlist).sort(
            (a, b) => b[1] - a[1]
          );
          let reviewGenre = Object.entries(genre.review).sort(
            (a, b) => b[1] - a[1]
          );
          let searchGenre = Object.entries(genre.search).sort(
            (a, b) => b[1] - a[1]
          );

          console.log("genre data");
          setWishlistGenre([...wishlistGenre]);
          setReviewGenre([...reviewGenre]);
          setSearchGenre([...searchGenre]);

          setTimeout(() => {
            setIsStatisticsLoaded(true);
          }, 1000);
        });
    }, [])
  );

  return (
    <View style={styles.container}>
      <DetailHeader
        onPress={() => {
          navigation.navigate("MyLibrary");
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
          {"나의 통계"}
        </Text>
      </DetailHeader>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={
            tier === "Bronze"
              ? require("../assets/icons/statistics/rank-bronze.png")
              : tier === "Silver"
              ? require("../assets/icons/statistics/rank-silver.png")
              : tier === "Gold"
              ? require("../assets/icons/statistics/rank-gold.png")
              : require("../assets/icons/statistics/rank-platinum.png")
          }
        ></Image>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color:
              tier === "Bronze"
                ? "#816401"
                : tier === "Silver"
                ? "#818181"
                : tier === "Gold"
                ? "#D4AF37"
                : "#00d8ff",
          }}
        >
          {tier}
        </Text>
        <Text
          style={{
            color: colors.gray4,
          }}
        >
          총 {review?.length} 개 리뷰 작성
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          height: 60,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "NotoSansKR_Medium",
          }}
        >
          {rankInfo?.userRank !== -1
            ? `당신은 상위 ${
                (rankInfo?.userRank / rankInfo?.totalUsers) * 100
              }% 유저입니다.`
            : `리뷰를 작성하여 순위를 알아보세요!`}
        </Text>
      </View>
      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colors.bgGray,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        {!isStatisticsLoaded ? (
          <View
            style={{
              width: "100%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.lightgreen} />
          </View>
        ) : (
          <>
            <GenreResult
              data={Object.entries(genre.wishlist).sort((a, b) => b[1] - a[1])}
              flag={0}
            />
            <GenreResult
              data={Object.entries(genre.review).sort((a, b) => b[1] - a[1])}
              flag={1}
            />
            <GenreResult
              data={Object.entries(genre.search).sort((a, b) => b[1] - a[1])}
              flag={2}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
    paddingTop: 30,
  },
});
