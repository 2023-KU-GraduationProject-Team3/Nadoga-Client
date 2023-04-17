import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";

import { RootTabScreenProps } from "../types";

// useContext
import UserContext from "../context/userContext";

// apis
import { deleteUser } from "../apis/user";

export default function Settings({
  navigation,
}: RootTabScreenProps<"Settings">) {
  const { user, logoutUser } = useContext(UserContext);

  useEffect(() => {
    console.log("user", user);
  }, []);

  const logout = () => {
    logoutUser({
      id: "",
      email: "",
      name: "",
      age: 0,
      gender: 0,
      genre: "",
    });
    console.log("logout");
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
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.title}>로그아웃</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          withDrawal();
        }}
      >
        <Text style={styles.title}>회원탈퇴</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
