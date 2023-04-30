import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";

import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import { RootTabScreenProps } from "../types";

// useContext
import UserContext from "../context/userContext";

// apis
import { deleteUser } from "../apis/user";

// constants
import Layout from "../constants/Layout";
import { colors } from "../constants/Colors";

// components
const ProfileImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: green;
  margin-bottom: 15px;
`;

// types
import { SettingScreenProps } from "../types";

export default function Settings({ navigation, route }: SettingScreenProps) {
  const { user, logoutUser } = useContext(UserContext);

  useEffect(() => {
    console.log("user", user);
  }, []);

  const logout = () => {
    Alert.alert("주의", "정말로 로그아웃 하시겠습니까?", [
      {
        text: "예",
        onPress: () => {
          logoutUser({
            id: "",
            email: "",
            name: "",
            age: 0,
            gender: 0,
            genre: "",
          });
          console.log("logout");
        },
      },
      {
        text: "아니오",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  const withDrawal = () => {
    Alert.alert("주의", "정말로 회원탈퇴 하시겠습니까?", [
      {
        text: "예",
        onPress: () => {
          logoutUser({
            id: "",
            email: "",
            name: "",
            age: 0,
            gender: 0,
            genre: "",
          });
          deleteUser(user.user_id);
        },
      },
      {
        text: "아니오",
        onPress: () => {
          return;
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: "40%",
          backgroundColor: colors.white,
          alignItems: "center",
          paddingTop: 50,
        }}
      >
        <ProfileImage source={require("../assets/images/icon.png")} />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 5,
          }}
        >
          {user.user_name}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {user.user_email}
        </Text>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
        >
          <Text style={styles.logout}>로그아웃</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: "7%",
          backgroundColor: colors.bgGray,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
        <Text
          style={{
            color: colors.gray4,
          }}
        >
          Account
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "15%",
          backgroundColor: colors.white,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "50%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("UserInfoChange");
          }}
        >
          <Text>계정 정보 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "50%",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            withDrawal();
          }}
        >
          <Text style={styles.withdrawal}>회원 탈퇴</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          height: "7%",
          backgroundColor: colors.bgGray,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
        }}
      >
        <Text
          style={{
            color: colors.gray4,
          }}
        >
          Contact
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "25%",
          backgroundColor: colors.white,
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "25%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <Text>앱 버전</Text>
          <Text
            style={{
              color: colors.gray4,
            }}
          >
            v.1.0.0
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "25%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>서비스이용약관</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "25%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>문의</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: "25%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text>오픈소스 라이선스</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logout: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.red,
    textDecorationLine: "underline",
  },
  withdrawal: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.red,
    textDecorationLine: "underline",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
