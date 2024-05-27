import { Redirect, Stack } from "expo-router";

import { useUser } from "@/hooks";
import { HeaderLogo, RedirectButton } from "@/components";
import { LogoSvg } from "@/assets";
import { Pressable } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export default function AuthLayout() {
  const { user } = useUser();
  if (user) return <Redirect href="(tabs)" />;

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerTransparent: true,
        headerBackVisible: false,
        headerTitleAlign: "center",
        headerLeft: () => <RedirectButton href="./" style={{marginLeft: 10}}><FontAwesome6 name="chevron-left" size={30} color="black" /></RedirectButton>,
        headerTitle: () => <LogoSvg />,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
