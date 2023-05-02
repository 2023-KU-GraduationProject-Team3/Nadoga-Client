import { useEffect, useState, useCallback, useContext } from "react";
import React, { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
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

// types
import { StatisticsScreenProps } from "../types";

// api authkey
const AUTHKEY =
  "32bb82a55e2ccb6dd8baec16309bed7ecc2985e9a07e83dc18b5037179636d55";

// apis
import { getReviewRankByUserId } from "../apis/review";

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

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  // const data = {
  //   labels: ["Test1", "Test2"],
  //   legend: ["L1", "L2", "L3"],
  //   data: [
  //     [60, 60, 60],
  //     [30, 30, 60],
  //   ],
  //   barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
  // };
  const data = [
    {
      name: "총류",
      population: 1,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "철학",
      population: 3,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "종교",
      population: 4,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    // {
    //   name: "사회과학",
    //   population: 0,
    //   color: "#ffffff",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
    // {
    //   name: "자연과학",
    //   population: 1,
    //   color: "rgb(0, 0, 255)",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
    // {
    //   name: "기술과학",
    //   population: 1,
    //   color: "rgb(0, 0, 255)",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
    // {
    //   name: "예술",
    //   population: 0,
    //   color: "rgb(0, 0, 255)",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
    // {
    //   name: "언어",
    //   population: 4,
    //   color: "rgb(0, 0, 255)",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
    // {
    //   name: "문학",
    //   population: 3,
    //   color: "rgb(0, 0, 115)",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
    // {
    //   name: "역사",
    //   population: 1,
    //   color: "rgb(0, 0, 235)",
    //   legendFontColor: "#7F7F7F",
    //   legendFontSize: 15,
    // },
  ];

  useEffect(() => {
    getReviewRankByUserId(user.user_id).then((res) => {
      setRankInfo(res);
    });
  }, [user, rankInfo]);

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
              }% 유저입니다!`
            : `리뷰를 작성하여 순위를 알아보세요!`}
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: colors.bgGray,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      ></ScrollView>
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
