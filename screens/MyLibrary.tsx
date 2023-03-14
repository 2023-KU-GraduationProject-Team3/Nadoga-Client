import { useEffect, useState } from "react";
import React, { StyleSheet, View, Text } from "react-native";

// constants
import { colors } from "../constants/Colors";

// components
import MyInfo from "../components/Header/MyInfo";

export default function MyLibrary() {
  const [menuNum, setMenuNum] = useState(0);
  const [isModal, setIsModal] = useState(false);

  const handleMenuNum = (num: number) => {
    setMenuNum(num);
  };

  const handleModal = () => {
    setIsModal(true);
  };

  return (
    <View style={styles.container}>
      <MyInfo
        name="신성준"
        email="shinsj4653@gmail.com"
        profile_img_url="../../assets/images/icon.png"
        wishlist_num={10}
        search_num={10}
        nameTextStyle={styles.name}
        emailTextStyle={styles.email}
        menuNum={menuNum}
        handleMenuNum={handleMenuNum}
        handleModal={handleModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
  },
  name: {
    fontSize: 26,
    fontFamily: "NotoSansKR_Bold",
    color: colors.semiblack,
  },
  email: {
    fontSize: 12,
    fontFamily: "NotoSansKR_Bold",
    color: colors.gray4,
    marginTop: -25,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
