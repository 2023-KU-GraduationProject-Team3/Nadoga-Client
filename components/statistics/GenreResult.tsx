import {
  useEffect,
  useState,
  useCallback,
  useContext,
  FunctionComponent,
} from "react";
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
import layout from "../../constants/Layout";
import { colors } from "../../constants/Colors";

const GenreResult: FunctionComponent = (props) => {
  useEffect(() => {
    // want to update the component when props.data changes
    console.log("genre result component loaded");
  }, [props.data[0].genre]);
  return (
    <View
      style={{
        // floating effect
        width: "90%",
        height: 200,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "30%",
          height: "100%",
          backgroundColor: colors.white,
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
          }}
        >
          {props.flag === 0
            ? "찜목록\n"
            : props.flag === 1
            ? "리뷰\n"
            : "검색기록\n"}
          장르별 순위
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Top3
        </Text>
      </View>
      <View
        style={{
          width: "70%",
          height: "100%",
          backgroundColor: colors.white,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: colors.white,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {props.data[2][1] === 0 ? "-" : props.data[2][0]}
          </Text>
          <View
            style={{
              width: "100%",
              height: 40,
              backgroundColor:
                props.flag === 0
                  ? colors.pink
                  : props.flag === 1
                  ? colors.lightyellow
                  : colors.lightblue,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              3
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 60,
            height: 150,
            backgroundColor: colors.white,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {props.data[0][1] === 0 ? "-" : props.data[0][0]}
          </Text>
          <View
            style={{
              width: "100%",
              height: 130,
              backgroundColor:
                props.flag === 0
                  ? colors.pink
                  : props.flag === 1
                  ? colors.lightyellow
                  : colors.lightblue,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              1
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 60,
            height: 100,
            backgroundColor: colors.white,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {props.data[1][1] === 0 ? "-" : props.data[1][0]}
          </Text>
          <View
            style={{
              width: "100%",
              height: 80,
              backgroundColor:
                props.flag === 0
                  ? colors.pink
                  : props.flag === 1
                  ? colors.lightyellow
                  : colors.lightblue,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              2
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GenreResult;
