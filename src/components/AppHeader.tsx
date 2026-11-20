import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, shadows } from '../theme';

export function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 8 }]}>
      <View style={styles.card}>
        <Text style={styles.title}>myDay24</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingBottom: 4,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: shadows.raised,
  },
  title: {
    fontFamily: 'Lusitana_400Regular',
    fontSize: 25,
    color: colors.text,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
