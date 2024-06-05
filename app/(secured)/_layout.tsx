import { Text } from "@/components";
import { useUser } from "@/providers/FirebaseProvider";
import { Redirect, Stack } from "expo-router";

export default function SecuredLayout() {
  const user = useUser();

  if (!user) return <Redirect href="(auth)" />;

  return (
    <Stack initialRouteName="(tabs)" screenOptions={{headerShown: false}}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
