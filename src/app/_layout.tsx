import { Lusitana_400Regular, useFonts } from '@expo-google-fonts/lusitana';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { AppHeader } from '../components/AppHeader';
import { migrateDb } from '../db/database';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Lusitana_400Regular });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SQLiteProvider databaseName="myday24.db" onInit={migrateDb}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ header: () => <AppHeader /> }} />
      </Stack>
    </SQLiteProvider>
  );
}
