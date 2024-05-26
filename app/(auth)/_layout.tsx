import useUser from "@/hooks/useUser";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const {user} = useUser()
  if (user) return <Redirect href="(tabs)" />;
  
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
