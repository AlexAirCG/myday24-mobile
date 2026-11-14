import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Здесь будет календарь</Text>
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
