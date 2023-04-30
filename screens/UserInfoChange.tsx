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

export default function UserInfoChange({
  navigation,
}: RootTabScreenProps<"Settings">) {
  const { user, logoutUser } = useContext(UserContext);

  useEffect(() => {
    console.log("user", user);
  }, []);

  return (
    <View style={styles.container}>
      <Text>UserInfoChange</Text>
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
