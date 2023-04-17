import React, { useState, useEffect } from "react";
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

// icons
import { Ionicons } from "@expo/vector-icons";

// constants
import { colors } from "../constants/Colors";
import Layout from "../constants/Layout";

// components
import AuthHeader from "../components/Header/AuthHeader";

// types
import { SignUpScreenProps } from "../types";

// apis
import { signUp, emailCheck } from "../apis/user";

export default function SignUp({ navigation, route }: SignUpScreenProps) {
  const [check, setCheck] = useState({
    email: false,
    pw: false,
    pwSame: false,
    nickname: false,
    age: false,
    personalInfoCheck: false,
  });

  const [text, setText] = useState({
    email: "",
    pw: "",
    pwSame: "",
    nickname: "",
    age: "",
  });

  const [pickState, setPickState] = useState({
    age: 20,
    gender: 0,
    genre: "총류",
    region: "서울",
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

  const [genderSelected, setGenderSelected] = useState({
    key: "0",
    value: "남성",
  });

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

  const [genreSelected, setGenreSelected] = useState({
    key: "0",
    value: "총류",
  });

  const [pwSecure, setPwSecure] = useState(true);
  const [pwSameSecure, setPwSameSecure] = useState(true);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  useEffect(() => {
    console.log("useEffect");
  }, [check]);
  return (
    <View style={styles.container}>
      <AuthHeader englishTitle="Create your Account" koreanTitle="회원 가입" />
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
            Password
          </Text>
          <TextInput
            value={text.pw}
            onChangeText={(value) => {
              const passwordRegExp =
                /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

              setText({ ...text, pw: value });

              if (passwordRegExp.test(value)) {
                setCheck({ ...check, pw: true });
              } else {
                setCheck({ ...check, pw: false });
              }
            }}
            placeholder="숫자, 영문자, 특수문자 조합으로 8자리 이상 입력"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: check.pw ? colors.green : colors.red,
              borderBottomWidth: 1,
              fontSize: 14,
              fontFamily: "NotoSansKR-Thin",
            }}
            secureTextEntry={pwSecure}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onPress={() => {
              setPwSecure(!pwSecure);
            }}
          >
            {pwSecure ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>

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
            Password 재입력
          </Text>
          <TextInput
            value={text.pwSame}
            onChangeText={(value) => {
              setText({ ...text, pwSame: value });
              if (value !== "" && text.pw == value) {
                setCheck({ ...check, pwSame: true });
              } else {
                setCheck({ ...check, pwSame: false });
              }
            }}
            placeholder="Enter your password again"
            placeholderTextColor="#909090"
            style={{
              width: 300,
              height: 40,
              borderBottomColor: check.pwSame ? colors.green : colors.red,
              borderBottomWidth: 1,
              fontSize: 14,
              fontFamily: "NotoSansKR-Thin",
            }}
            secureTextEntry={pwSameSecure}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onPress={() => {
              setPwSameSecure(!pwSameSecure);
            }}
          >
            {pwSameSecure ? (
              <Ionicons name="eye-off" size={24} color="black" />
            ) : (
              <Ionicons name="eye" size={24} color="black" />
            )}
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
      >
        <CheckBox
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: "NotoSansKR_Thin",
            fontSize: 18,
            color: colors.black,
          }}
        >
          개인정보 처리 동의
        </Text>
      </View>

      <TouchableOpacity
        style={styles.signUpBtn}
        onPress={() => {
          if (
            check.email &&
            check.pw &&
            check.pwSame &&
            check.nickname &&
            check.age &&
            genderSelected != null &&
            genreSelected != null &&
            toggleCheckBox
          ) {
            setText({ email: "", pw: "", pwSame: "", nickname: "", age: "" });
            setCheck({
              email: false,
              pw: false,
              pwSame: false,
              nickname: false,
              age: false,
            });

            signUp({
              email: text.email,
              password: text.pw,
              name: text.nickname,
              gender: genderSelected.key,
              age: parseInt(text.age),
              genre: genreSelected.value,
            });

            Alert.alert("회원가입 완료", "로그인 페이지로 이동하시겠습니까?", [
              { text: "예", onPress: () => navigation.navigate("Login") },
              {
                text: "아니오",
                onPress: () => {
                  return;
                },
              },
            ]);
          } else {
            if (!check.email) {
              alert("이메일을 확인해주세요");
            } else if (!check.pw) {
              alert("비밀번호를 확인해주세요");
            } else if (!check.pwSame) {
              alert("비밀번호가 일치하지 않습니다");
            } else if (!check.nickname) {
              alert("닉네임을 확인해주세요");
            } else if (!check.age) {
              alert("나이를 확인해주세요");
            } else if (!toggleCheckBox) {
              alert("개인정보 처리 동의를 해주세요");
            }
          }
        }}
      >
        <Text
          style={{
            color: "#FCFAF2",
          }}
        >
          SIGN UP
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
