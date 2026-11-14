import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Здесь будет бюджет</Text>
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
