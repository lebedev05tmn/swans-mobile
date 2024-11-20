import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false ,
      }}>
      {/* Optionally configure static options outside the route.*/}
    </Stack>
  );
}
