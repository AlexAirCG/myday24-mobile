import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

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
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    color: 'gray',
  },
});
