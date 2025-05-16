import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from '../context/UserContext';

// Import global CSS
import '../global.css';

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'winky': require('../assets/fonts/WinkyRough-Regular.ttf'),
    'winky-bold': require('../assets/fonts/WinkyRough-Bold.ttf'),
  });

  // If fonts aren't loaded yet, don't render anything
  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
      {/* Include StatusBar from App.jsx */}
      <StatusBar style="auto" />
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}