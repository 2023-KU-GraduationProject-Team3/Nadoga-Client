import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  StyleProp,
  TextStyle,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

// constants
import { colors } from "../../constants/Colors";
import layout from "../../constants/Layout";

// icons
import { Ionicons } from "@expo/vector-icons";
// components
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: ${layout.window.width - 60}px;
  margin-top: 50px;
`;

const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-right: 20px;
  background-color: green;
`;

const InfoContainer = styled.View`
  flex-direction: column;
  width: 65%;
`;
const InfoTopContainer = styled.View`
  width: 100%;
  flex-direction: column;
`;

const InfoBottomContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

// types
interface HeaderProps {
  name: string;
  email: string;
  profile_img_url: string;
  wishlist_num: number;
  search_num: number;
  menuNum: number;
  handleMenuNum: (num: number) => void;
  handleModal: () => void;
  nameTextStyle?: StyleProp<TextStyle>;
  emailTextStyle?: StyleProp<TextStyle>;
}

const RecommendHeader: FunctionComponent<HeaderProps> = (props) => {
  return (
    <HeaderContainer>
      <ProfileImage source={require("../../assets/images/icon.png")} />
      <InfoContainer>
        <InfoTopContainer>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
            <Text style={props.nameTextStyle}>{props.name}</Text>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 15,
              }}
              onPress={() => {
                props.handleModal();
              }}
            >
              <Ionicons name="stats-chart" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <Text style={props.emailTextStyle}>{props.email}</Text>
        </InfoTopContainer>
        <InfoBottomContainer>
          <TouchableOpacity
            onPress={() => {
              props.handleMenuNum(0);
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: props.menuNum === 0 ? colors.red : colors.black,
                  fontSize: 24,
                  fontFamily: "NotoSans_Medium",
                  fontWeight: "700",
                }}
              >
                {props.wishlist_num}
              </Text>
              <Text
                style={{
                  color: props.menuNum === 0 ? colors.red : colors.black,
                  fontSize: 12,
                  fontFamily: "NotoSans_Regular",
                }}
              >
                찜목록
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.handleMenuNum(1);
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: props.menuNum === 1 ? colors.red : colors.black,
                  fontSize: 24,
                  fontWeight: "700",
                  fontFamily: "NotoSans_Medium",
                }}
              >
                {props.wishlist_num}
              </Text>
              <Text
                style={{
                  color: props.menuNum === 1 ? colors.red : colors.black,
                  fontSize: 12,
                  fontFamily: "NotoSans_Regular",
                }}
              >
                도서 검색기록
              </Text>
            </View>
          </TouchableOpacity>
        </InfoBottomContainer>
      </InfoContainer>
    </HeaderContainer>
  );
};

export default RecommendHeader;
