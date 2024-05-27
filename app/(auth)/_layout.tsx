import { Redirect, Stack } from "expo-router";

import {useUser} from "@/hooks";

export default function AuthLayout() {
  const { user } = useUser();
  if (user) return <Redirect href="(tabs)" />;

  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
