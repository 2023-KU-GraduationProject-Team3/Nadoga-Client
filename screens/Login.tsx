import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

// colors
import { colors } from "../constants/Colors";

// components
import AuthHeader from "../components/Header/AuthHeader";

// types
import { LoginScreenProps } from "../types";

export default function Login({ navigation, route }: LoginScreenProps) {
  return (
    <View style={styles.container}>
      <AuthHeader englishTitle="Account Login" koreanTitle="로그인하기" />
      <View style={styles.inputSection}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSansKR-Medium",
              color: colors.semiblack,
              fontWeight: "bold",
            }}
          >
            Email
          </Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              fontSize: 16,
              fontFamily: "NotoSansKR-Thin",
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSansKR-Medium",
              color: colors.semiblack,
              fontWeight: "bold",
            }}
          >
            Password
          </Text>
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: "#DEDEDE",
              borderBottomWidth: 1,
              fontSize: 16,
              fontFamily: "NotoSansKR-Thin",
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "NotoSansKR_Thin",
            color: colors.black,
            marginBottom: 150,
          }}
        >
          계정이 없으신가요?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
        <Text
          style={{
            color: "#FCFAF2",
          }}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.bgGray,
    paddingTop: 150,
  },

  inputSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 170,
    marginBottom: 20,
    marginTop: 50,
  },
  loginBtn: {
    width: 240,
    height: 58,
    backgroundColor: colors.semiblack,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
