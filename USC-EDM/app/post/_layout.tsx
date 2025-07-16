import React from 'react';
import { Stack } from 'expo-router';

export default function PostLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => null }} />
    </Stack>
  );
}