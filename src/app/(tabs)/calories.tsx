import { StyleSheet, Text, View } from 'react-native';

export default function CaloriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Здесь будет учёт калорий</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bae6fd',
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
});
