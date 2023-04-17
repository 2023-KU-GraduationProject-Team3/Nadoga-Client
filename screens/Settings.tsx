import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { RootTabScreenProps } from "../types";

// useContext
import UserContext from "../context/userContext";

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.title}>Logout</Text>
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
