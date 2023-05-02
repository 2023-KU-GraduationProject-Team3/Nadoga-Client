import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import CheckBox from "expo-checkbox";
import { SelectDropdown, DropdownData } from "expo-select-dropdown";
import styled from "styled-components/native";

// icons
import { Ionicons } from "@expo/vector-icons";

// constants
import { colors } from "../constants/Colors";
import Layout from "../constants/Layout";

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
import { UserInfoChangeScreenProps } from "../types";

// apis
import { signUp, emailCheck, updateUser } from "../apis/user";

// useContext
import UserContext from "../context/userContext";

export default function UserInfoChange({
  navigation,
  route,
}: UserInfoChangeScreenProps) {
  const { user, setUser } = useContext(UserContext);

  const [check, setCheck] = useState({
    email: true,
    nickname: true,
    age: true,
  });

  const [text, setText] = useState({
    email: user.user_email,
    nickname: user.user_name,
    age: user.user_age.toString(),
  });

  const [genderData, setGenderData] = useState([
    {
      key: "0",
      value: "남성",
    },
    {
      key: "1",
      value: "여성",
    },
  ]);

  const [genderSelected, setGenderSelected] = useState(
    genderData.find((item) => {
      return Number(item.key) === user.user_gender;
    })
  );

  const [genreData, setGenreData] = useState([
    {
      key: "0",
      value: "총류",
    },
    {
      key: "1",
      value: "철학",
    },
    {
      key: "2",
      value: "종교",
    },
    {
      key: "3",
      value: "사회과학",
    },
    {
      key: "4",
      value: "자연과학",
    },
    {
      key: "5",
      value: "기술과학",
    },
    {
      key: "6",
      value: "예술",
    },
    {
      key: "7",
      value: "언어",
    },
    {
      key: "8",
      value: "문학",
    },
    {
      key: "9",
      value: "역사",
    },
  ]);

  const [genreSelected, setGenreSelected] = useState(
    genreData.find((item) => {
      return item.value === user.user_genre;
    })
  );

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    console.log("userInfo", user.user_age);
  }, [user]);
  return (
    <View style={styles.container}>
      <DetailHeader
        onPress={() => {
          navigation.navigate("Setting");
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
          {"개인정보 수정"}
        </Text>
      </DetailHeader>

      <View style={styles.seperator}></View>

      <ScrollView
        style={{
          width: "100%",
          height: "100%",
          paddingHorizontal: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* <KeyboardAvoidingView
          behavior="position"
          style={{
            height: "100%",
          }}
        > */}
        <View
          style={{
            marginBottom: 20,
            position: "relative",
          }}
        >
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
            value={text.email}
            onChangeText={(value) => {
              setText({ ...text, email: value });
              setCheck({ ...check, email: false });
              // const emailRegex =/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
              // if (emailRegex.test(value)) {
              //   setCheck({ ...check, email: true });
              // } else {
              //   setCheck({ ...check, email: false });
              // }
            }}
            placeholder="Enter your email"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: check.email ? colors.green : colors.red,
              borderBottomWidth: 1,
              fontSize: 14,
              fontFamily: "NotoSansKR-Thin",
            }}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onPress={() => {
              // id 중복확인
              const emailRegex =
                /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

              if (text.email === "") {
                alert("이메일을 입력하세요.");
              } else {
                if (!emailRegex.test(text.email)) {
                  alert("형식에 맞지 않는 이메일입니다.");
                } else {
                  emailCheck(text.email).then((res) => {
                    console.log(res);
                    if (res) {
                      alert("중복되는 이메일입니다");
                    } else {
                      alert("사용가능한 이메일입니다.");
                      setCheck({ ...check, email: true });
                    }
                  });
                }
              }
            }}
          >
            <Text>중복확인</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSansKR-Medium",
              color: colors.semiblack,
              fontWeight: "bold",
            }}
          >
            닉네임
          </Text>
          <TextInput
            value={text.nickname}
            onChangeText={(value) => {
              setText({ ...text, nickname: value });
              if (value !== "") {
                setCheck({ ...check, nickname: true });
              } else {
                setCheck({ ...check, nickname: false });
              }
            }}
            placeholder="Enter your nickname"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: check.nickname ? colors.green : colors.red,
              borderBottomWidth: 1,
              fontSize: 14,
              fontFamily: "NotoSansKR-Thin",
            }}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSansKR-Medium",
              color: colors.semiblack,
              fontWeight: "bold",
            }}
          >
            나이
          </Text>
          <TextInput
            value={text.age}
            onChangeText={(value) => {
              setText({ ...text, age: value });
              if (
                parseInt(value) >= 0 &&
                parseInt(value) <= 200 &&
                value != ""
              ) {
                setCheck({ ...check, age: true });
              } else {
                setCheck({ ...check, age: false });
              }
            }}
            placeholder="Enter your age"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: check.age ? colors.green : colors.red,
              borderBottomWidth: 1,
              fontSize: 14,
              fontFamily: "NotoSansKR-Thin",
            }}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSansKR-Medium",
              color: colors.semiblack,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            성별
          </Text>
          <SelectDropdown
            data={genderData}
            placeholder={"Select your gender"}
            selected={genderSelected}
            setSelected={setGenderSelected}
            searchOptions={{ cursorColor: "#007bff" }}
            searchBoxStyles={{ borderColor: "lightgray" }}
            dropdownStyles={{ borderColor: "lightgray" }}
          />
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "NotoSansKR-Medium",
              color: colors.semiblack,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            선호 장르
          </Text>
          <SelectDropdown
            data={genreData}
            placeholder={"Select your genre"}
            selected={genreSelected}
            setSelected={setGenreSelected}
            searchOptions={{ cursorColor: "#007bff" }}
            searchBoxStyles={{ borderColor: "lightgray" }}
            dropdownStyles={{ borderColor: "lightgray" }}
          />
        </View>

        {/* </KeyboardAvoidingView> */}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: 300,
          marginBottom: 10,
        }}
      ></View>

      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          if (
            check.email &&
            check.nickname &&
            check.age &&
            genderSelected != null &&
            genreSelected != null
          ) {
            Alert.alert("알림", "개인정보 변경을 하시겠습니까??", [
              {
                text: "예",
                onPress: () => {
                  setCheck({
                    email: false,
                    nickname: false,
                    age: false,
                  });
                  // updateUser
                  updateUser(user.user_id, {
                    email: text.email,
                    name: text.nickname,
                    age: Number(text.age),
                    gender: Number(genderSelected.key),
                    genre: genreSelected.value,
                  });

                  setUser({
                    ...user,
                    user_email: text.email,
                    user_name: text.nickname,
                    user_age: Number(text.age),
                    user_gender: Number(genderSelected.key),
                    user_genre: genreSelected.value,
                  });

                  navigation.navigate("Setting");
                },
              },
              {
                text: "아니오",
                onPress: () => {
                  return;
                },
              },
            ]);
            // setText({ email: "", nickname: "", age: "" });
          } else {
            if (!check.email) {
              alert("이메일을 확인해주세요");
            } else if (!check.nickname) {
              alert("닉네임을 확인해주세요");
            } else if (!check.age) {
              alert("나이를 확인해주세요");
            }
          }
        }}
      >
        <Text
          style={{
            color: "#FCFAF2",
          }}
        >
          수정완료
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: colors.bgGray,
  },
  seperator: {
    width: 300,
    height: 1,
    marginTop: 20,
  },
  signUpBtn: {
    width: 240,
    height: 58,
    backgroundColor: colors.semiblack,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
});
