import React, { useState, useEffect, FunctionComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import styled from "styled-components/native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// icons
import { FontAwesome } from "@expo/vector-icons";

// components
const ReviewItemContainer = styled.View`
  width: ${layout.window.width - 30}px;
  background-color: ${colors.bgGray};
  margin-bottom: 20px;
  height: 100px;
  flex-direction: row;
`;
const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-right: 10px;
  background-color: white;
  margin-top: 5px;
`;

// types
import { ReviewProps } from "./types";

const ReviewItem: FunctionComponent<ReviewProps> = (props) => {
  return (
    <ReviewItemContainer>
      <ProfileImage
        source={require("../../assets/images/icon.png")}
      ></ProfileImage>
      <View
        style={{
          width: layout.window.width - 100,
          height: "100%",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "NotoSansKR_Bold",
              color: colors.green,
            }}
          >
            {props.user.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 50,
              height: 50,
            }}
          >
            <FontAwesome
              name="star"
              size={15}
              color={colors.yellow}
              style={{ marginRight: 5 }}
            />
            <Text
              style={{
                fontSize: 12,
                fontFamily: "NotoSansKR_Medium",
                color: colors.black,
              }}
            >
              {props.rating}
            </Text>
          </View>
        </View>
        <View>
          <Text>{props.content}</Text>
        </View>
      </View>
    </ReviewItemContainer>
  );
};
export default ReviewItem;
