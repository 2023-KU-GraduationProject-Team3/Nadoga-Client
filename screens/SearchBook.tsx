import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../constants/Colors';

export default function SearchBook() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Book</Text>
      <View style={styles.separator}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
