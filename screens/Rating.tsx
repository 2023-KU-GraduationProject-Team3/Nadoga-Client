import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

// types
import { RootTabScreenProps, RatingScreenProps } from "../types";

// constants
import { colors } from "../constants/Colors";
import Layout from "../constants/Layout";

// icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// components
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

export default function Rating({ navigation, route }: RatingScreenProps) {
  const [bookIsbn, setBookIsbn] = useState<number>(route.params.bookIsbn);
  const [bookName, setBookName] = useState<string>(route.params.bookName);

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
          도서 평점
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
    marginBottom: 30,
  },
});
