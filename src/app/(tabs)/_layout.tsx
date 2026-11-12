import { TopTabs } from 'expo-router/js-top-tabs';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function TabsLayout() {
  return (
    <TopTabs
      screenOptions={{
        tabBarScrollEnabled: true,

        // 1. Вся полоса вкладок
        tabBarStyle: {
          backgroundColor: '#e0f2fe',
          elevation: 0,
        },

        // 2. Ряд вкладок внутри полосы: отступы по краям
        tabBarContentContainerStyle: {
          paddingHorizontal: 8,
          paddingVertical: 8,
        },

        // 3. Расстояние между вкладками
        tabBarGap: 8,

        // 4. Каждая вкладка: рамка-«кнопка»
        tabBarItemStyle: {
          width: 'auto',
          minHeight: 0,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: '#7dd3fc',
          borderRadius: 6,
          overflow: 'hidden',
        },

        // 5. Текст вкладки
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
          textTransform: 'none',
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#0369a1',

        // 6. Синий прямоугольник выбранной вкладки
        tabBarIndicatorStyle: {
          backgroundColor: '#0284c7',
          height: undefined,
          top: 8,
          bottom: 8,
          borderRadius: 6,
        },

        // 7. Эффект нажатия
        tabBarPressColor: 'rgba(2, 132, 199, 0.3)',
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
