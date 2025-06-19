import React from 'react';
import { Stack } from 'expo-router';

export default function ShopLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ header: () => null }} />
    </Stack>
  );
}