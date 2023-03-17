import React, { FunctionComponent } from "react";
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

// components
const HeaderContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: ${layout.window.width - 40}px;
  margin-top: 20px;
`;

// react-query
import { useQuery } from "react-query";

// axios
import axios from "axios";

// types
interface HeaderProps {
  title: string;
  description: string;
  menuNum: number;
  handleMenuNum: (num: number) => void;
  titleTextStyle?: StyleProp<TextStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
}

const RecommendHeader: FunctionComponent<HeaderProps> = (props) => {
  // const fetchLibraryData = async () => {
  //   return await axios.get(
  //     `https://data4library.kr/api/libSrch?authKey=${process.env.LIBRARY_AUTHKEY}&pageSize=10&pageNo=1`
  //   );
  // };

  // const getLibraryData = () => {
  //   const { data, isLoading } = useQuery("GET_LIBRARY", fetchLibraryData);
  //   return data;
  // };
  return (
    <HeaderContainer>
      <View
        style={{
          width: "100%",
          height: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={props.titleTextStyle}>{props.title}</Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                props.menuNum === 0 ? colors.green : colors.gray2,
              paddingLeft: 5,
              height: 30,
              width: 60,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            onPress={() => {
              props.handleMenuNum(0);
              //const data = getLibraryData();
              //alert(data);
            }}
          >
            <Text
              style={{
                color: props.menuNum === 0 ? colors.gray2 : colors.green,
                fontSize: 12,
              }}
            >
              도서 기록
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 10,
              backgroundColor:
                props.menuNum === 1 ? colors.green : colors.gray2,
              height: 30,
              width: 60,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            onPress={() => {
              props.handleMenuNum(1);
            }}
          >
            <Text
              style={{
                color: props.menuNum === 1 ? colors.gray2 : colors.green,
                fontSize: 12,
              }}
            >
              유저 기반
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={props.descriptionTextStyle}>{props.description}</Text>
    </HeaderContainer>
  );
};

export default RecommendHeader;
