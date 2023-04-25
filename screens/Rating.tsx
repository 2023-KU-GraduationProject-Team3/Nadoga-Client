import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import StarRating from "react-native-star-rating-widget";

// types
import { RootTabScreenProps, RatingScreenProps } from "../types";

// constants
import { colors } from "../constants/Colors";
import Layout from "../constants/Layout";

// icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// components
import ReviewSection from "../components/Review/ReviewSection";

const DetailHeader = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${colors.bgGray};
  width: 170px;
  height: 50px;
  align-items: center;
  margin-right: 220px;
  padding-left: 30px;
  margin-bottom: 10px;
`;

const BookRatingInfoContainer = styled.View`
  flex-direction: row;
  width: ${Layout.window.width - 50}px;
  height: 80px;
  background-color: ${colors.bgGray};
  align-items: center;
  margin-bottom: 30px;
`;
// react-query
import { useQuery } from "react-query";

// apis
import { getReviewByBook, getReviewStarByBook } from "../apis/review";

export default function Rating({ navigation, route }: RatingScreenProps) {
  const [bookIsbn, setBookIsbn] = useState<number>(route.params.bookIsbn);
  const [bookName, setBookName] = useState<string>(route.params.bookName);

  const [hasRated, setHasRated] = useState<boolean>(false);
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(true);

  // 유저가 이미 리뷰를 작성한 상태일 때, 가져온 리뷰 데이터
  const [reviewInfo, setReviewInfo] = useState<any>({
    rating: 4.5,
    content: "책이 너무 좋아요!",
  });

  // 아직 리뷰 작성하지 않은 상태일 때, 평점 및 한줄평 상태
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const [reviewList, setReviewList] = useState<any>([
    {
      review_id: 1,
      user_name: "홍길동",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet cursus ante, eget augue.",
      profile_url: "https://i.pravatar.cc/150?img=4",
    },
    {
      review_id: 2,

      user_name: "홍길동",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet cursus ante, eget augue.",
      profile_url: "https://i.pravatar.cc/150?img=4",
    },
    {
      review_id: 3,
      user_name: "홍길동",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet cursus ante, eget augue.",
      profile_url: "https://i.pravatar.cc/150?img=4",
    },
    {
      review_id: 4,
      user_name: "홍길동",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet cursus ante, eget augue.",
      profile_url: "https://i.pravatar.cc/150?img=4",
    },
    {
      review_id: 5,
      user_name: "홍길동",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet cursus ante, eget augue.",
      profile_url: "https://i.pravatar.cc/150?img=4",
    },
    {
      review_id: 6,
      user_name: "홍길동",
      rating: 4.5,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquet cursus ante, eget augue.",
      profile_url: "https://i.pravatar.cc/150?img=4",
    },
  ]);
  const [isReviewLoaded, setIsReviewLoaded] = useState<boolean>(false);

  // const {
  //   data: reviewData,
  //   isLoading: reviewIsLoading,
  //   isFetched: reviewIsFetched,
  // } = useQuery("GET_REVIEW", () => getReviewByBook(bookIsbn));

  useEffect(() => {
    if (!isReviewLoaded) {
      getReviewByBook(bookIsbn).then((res) => {
        console.log(res);
        setReviewList(res);
        setIsReviewLoaded(true);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
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
          이전으로
        </Text>
      </DetailHeader>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 25,
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins_Medium",
          }}
        >
          {bookName}
        </Text>
      </View>
      <BookRatingInfoContainer>
        <Text
          style={{
            fontSize: 52,
            fontFamily: "Poppins_Medium",
            marginRight: 15,
          }}
        >
          4.5
        </Text>
        <FontAwesome name="star" size={30} color={colors.yellow} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginLeft: -10,
          }}
        >
          {[3, 2, 0, 0, 1].map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  height: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "Poppins_Medium",
                    color: colors.gray4,
                  }}
                >
                  {5 - index}
                </Text>
                <View
                  style={{
                    width: "65%",
                    height: 5,
                    backgroundColor: colors.gray2,
                    borderRadius: 5,
                    marginLeft: 10,
                  }}
                >
                  <View
                    style={{
                      width: item * 20,
                      height: 5,
                      backgroundColor: colors.yellow,
                      borderRadius: 5,
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </BookRatingInfoContainer>
      <View style={styles.seperator}></View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: Layout.window.width - 20,

            marginBottom: 10,
            paddingHorizontal: 15,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NotoSansKR_Bold",
              color: colors.gray4,
            }}
          >
            {reviewModalVisible
              ? null
              : hasRated
              ? "내가 작성한 리뷰"
              : "내가 작성한 한줄평이 없습니다."}
          </Text>
          {hasRated || reviewModalVisible ? null : (
            <TouchableOpacity
              onPress={() => {
                setReviewModalVisible(true);
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "NotoSansKR_Bold",
                  color: colors.green,
                  textDecorationLine: "underline",
                }}
              >
                + 한줄평 남기기
              </Text>
            </TouchableOpacity>
          )}
          {reviewModalVisible ? (
            <View
              style={{
                width: "100%",
                height: 120,
                backgroundColor: colors.white,
                borderRadius: 10,
                padding: 10,
                position: "relative",
              }}
            >
              <StarRating
                rating={rating}
                onChange={setRating}
                starSize={30}
                starStyle={{
                  marginBottom: 10,
                  width: 20,
                }}
              />
              <TextInput
                placeholder="한줄평을 적어주세요."
                placeholderTextColor={colors.gray4}
                value={content}
                onChangeText={setContent}
                style={{
                  width: "100%",
                  backgroundColor: colors.white,
                  fontSize: 12,
                  fontFamily: "NotoSansKR_Regular",
                  color: colors.semiblack,
                  paddingLeft: 5,
                }}
              ></TextInput>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 40,
                  right: 70,
                }}
                onPress={() => {
                  setReviewModalVisible(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansKR_Bold",
                    color: colors.gray3,
                    textDecorationLine: "underline",
                    position: "absolute",
                  }}
                >
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 15,
                }}
                onPress={() => {
                  if (content === "") {
                    alert("한줄평을 작성해주세요.");
                    return;
                  } else {
                    setHasRated(true);
                    setReviewModalVisible(false);
                  }
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansKR_Bold",
                    color: colors.green,
                    textDecorationLine: "underline",
                  }}
                >
                  등록
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      {hasRated ? <View style={styles.seperator}></View> : null}
      {!isReviewLoaded ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>리뷰 불러오는 중...</Text>
        </View>
      ) : isReviewLoaded && reviewList.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>리뷰가 존재하지 않습니다.</Text>
        </View>
      ) : (
        <ReviewSection reviews={reviewList} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGray,
    paddingTop: 30,
    flex: 1,
    alignItems: "center",
  },
  seperator: {
    width: "90%",
    height: 1,
    backgroundColor: colors.gray2,
    marginBottom: 10,
  },
});
