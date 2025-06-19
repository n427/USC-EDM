import { Slot, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with real auth check

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (isAuthenticated) {
      router.replace('/(tabs)');
    } else {
      router.replace('/auth/auth');
    }
  }, [isMounted, isAuthenticated]);

  return <Slot />;
}
