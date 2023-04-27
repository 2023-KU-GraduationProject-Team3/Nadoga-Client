import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import StarRating from "react-native-star-rating-widget";
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";

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
import ReviewItem from "../components/Review/ReviewItem";

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
import {
  getReviewByBook,
  getReviewStarByBook,
  addReview,
  deleteReview,
} from "../apis/review";

// useContext
import UserContext from "../context/userContext";

export default function Rating({ navigation, route }: RatingScreenProps) {
  const [bookIsbn, setBookIsbn] = useState<number>(route.params.bookIsbn);
  const [bookName, setBookName] = useState<string>(route.params.bookName);

  const [hasRated, setHasRated] = useState<boolean>(false);
  const [reviewModalVisible, setReviewModalVisible] = useState<boolean>(false);

  const { user, logoutUser } = useContext(UserContext);

  // 유저가 이미 리뷰를 작성한 상태일 때, 가져온 리뷰 데이터
  const [reviewInfo, setReviewInfo] = useState<any>({
    user: {
      name: "홍길동",
    },
    review_id: 1,
    rating: 4.5,
    content: "책이 너무 좋아요!",
  });

  // 아직 리뷰 작성하지 않은 상태일 때, 평점 및 한줄평 상태
  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const [reviewList, setReviewList] = useState<any>([]);
  const [isReviewLoaded, setIsReviewLoaded] = useState<boolean>(false);

  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    isFetched: reviewIsFetched,
    refetch: reviewRefetch,
  } = useQuery("GET_REVIEW", () => getReviewByBook(bookIsbn), {
    onSuccess: () => {
      // const userReview = reviewData.filter(
      //   (item) => item.user.id === user.user_id
      // )[0];
      // if (userReview !== undefined) {
      //   console.log("has rated");
      //   setHasRated(true);
      //   setReviewList(
      //     reviewData.filter((item) => item.user.id !== user.user_id)
      //   );
      //   setReviewInfo({
      //     user: {
      //       name: userReview.user.name,
      //     },
      //     review_id: userReview.id,
      //     rating: userReview.rating,
      //     content: userReview.content,
      //   });
      // } else {
      //   console.log("has not rated");
      //   setReviewList(reviewData);
      //   setHasRated(false);
      // }
    },
  });

  useFocusEffect(
    useCallback(() => {
      setReviewInfo({});
      console.log("bookisbn", bookIsbn);

      const userReview = reviewData.filter(
        (item) => item.user.id === user.user_id
      )[0];

      if (userReview !== undefined) {
        console.log("has rated");
        setHasRated(true);
        setReviewList(
          reviewData.filter((item) => item.user.id !== user.user_id)
        );
        setReviewInfo({
          user: {
            name: userReview.user.name,
          },
          review_id: userReview.id,
          rating: userReview.rating,
          content: userReview.content,
        });
      } else {
        console.log("has not rated");
        setReviewList(reviewData);
        setHasRated(false);
      }
    }, [])
  );

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
            flexDirection: hasRated ? "column" : "row",
            width: Layout.window.width - 20,
            alignItems: "flex-start",
            marginBottom: 10,
            paddingHorizontal: 10,
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
          {hasRated ? (
            <ReviewItem {...reviewInfo} />
          ) : reviewModalVisible ? null : (
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
                    Alert.alert("알림", "정말로 리뷰를 등록하시겠습니까?", [
                      {
                        text: "취소",
                        onPress: () => {
                          return;
                        },
                      },
                      {
                        text: "확인",
                        onPress: () => {
                          addReview(
                            user.user_id,
                            rating,
                            content,
                            bookIsbn
                          ).then(() => {
                            setReviewInfo({
                              user: {
                                name: user.user_name,
                              },
                              rating,
                              content,
                            });
                          });
                          setHasRated(true);
                          setReviewModalVisible(false);
                          reviewRefetch();
                        },
                      },
                    ]);
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
          ) : hasRated ? (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 40,
                  right: 70,
                }}
                onPress={() => {}}
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
                  수정
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 15,
                }}
                onPress={() => {
                  Alert.alert("주의", "정말로 리뷰를 삭제하시겠습니까?", [
                    {
                      text: "취소",
                      onPress: () => {
                        return;
                      },
                    },
                    {
                      text: "확인",
                      onPress: () => {
                        deleteReview(reviewInfo.review_id);
                        setHasRated(false);
                        setReviewModalVisible(false);
                        reviewRefetch();
                        setContent("");
                      },
                    },
                  ]);
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "NotoSansKR_Bold",
                    color: colors.red,
                    textDecorationLine: "underline",
                  }}
                >
                  삭제
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
      {hasRated ? <View style={styles.seperator}></View> : null}
      {reviewIsLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>리뷰 불러오는 중...</Text>
        </View>
      ) : reviewIsFetched && reviewList.length === 0 ? (
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
