import React, { useEffect, useState } from 'react';
import { useRouter, SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
  });

  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real auth check

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !fontsLoaded) return;

    SplashScreen.hideAsync();

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/auth');
    }
  }, [isMounted, fontsLoaded, isAuthenticated]);

  if (!fontsLoaded || !isMounted) return null;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="tickets" />
        <Stack.Screen 
          name="event/[id]" 
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}