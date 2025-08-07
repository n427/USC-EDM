import React from 'react';
import { Stack } from 'expo-router';

export default function YearbookLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[postId]" options={{ headerShown: false }} />
    </Stack>
  );
}
