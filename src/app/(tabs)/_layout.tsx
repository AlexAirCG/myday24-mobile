import { TopTabs } from 'expo-router/js-top-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { colors, shadows } from '../../theme';

export const unstable_settings = {
  initialRouteName: 'index',
};

type TabButtonProps = {
  focused: boolean;
  children: string;
};

function TabButton({ focused, children }: TabButtonProps) {
  return (
    <View
      style={[
        styles.button,
        focused ? styles.buttonPressed : styles.buttonRaised,
      ]}
    >
      <Text style={[styles.text, focused && styles.textPressed]}>
        {children}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <TopTabs
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: false,

        // Вся полоса вкладок
        tabBarStyle: {
          backgroundColor: colors.background,
          elevation: 0,
        },

        // Отступы вокруг ряда кнопок: нужны, чтобы тени не обрезались
        tabBarContentContainerStyle: {
          paddingHorizontal: 10,
          paddingVertical: 10,
        },
        tabBarGap: 10,

        // Вкладка теперь просто «место» под нашу кнопку
        tabBarItemStyle: {
          width: 'auto',
          minHeight: 0,
          padding: 0,
        },

        // Вместо текста рисуем свою кнопку
        tabBarLabel: ({ focused, children }) => (
          <TabButton focused={focused}>{children}</TabButton>
        ),

        // Убираем синий прямоугольник и волну при нажатии
        tabBarIndicatorStyle: { backgroundColor: 'transparent' },
        tabBarPressColor: 'transparent',
      }}
    >
      <TopTabs.Screen name="calendar" options={{ title: 'Календарь' }} />
      <TopTabs.Screen name="index" options={{ title: 'Дела' }} />
      <TopTabs.Screen name="shop" options={{ title: 'Покупки' }} />
      <TopTabs.Screen name="calories" options={{ title: 'Калории' }} />
      <TopTabs.Screen name="budget" options={{ title: 'Бюджет' }} />
    </TopTabs>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  buttonRaised: {
    boxShadow: shadows.raised,
  },
  buttonPressed: {
    boxShadow: shadows.pressed,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  textPressed: {
    color: colors.accent,
  },
});
