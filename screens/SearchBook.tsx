import { StyleSheet, View, Text } from "react-native";
import { colors } from "../constants/Colors";

// components
import SearchBar from "../components/SearchBar/SearchBar";

export default function SearchBook() {
  return (
    <View style={styles.container}>
      <SearchBar placeholder="노인과 바다" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.bgGray,
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
