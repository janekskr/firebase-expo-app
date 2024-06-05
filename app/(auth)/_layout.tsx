import { Redirect, Stack } from "expo-router";

import { Button } from "@/components";
import { FontAwesome6 } from "@expo/vector-icons";
import { useUser } from "@/providers/FirebaseProvider";

export default function AuthLayout() {
  const user = useUser();
  
  if (user) return <Redirect href="(secured)" />;

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: "black",
        title: "",
        headerLeft: () => (
          <Button href="./" style={{marginLeft: 20}}>
            <FontAwesome6 name="arrow-left" size={24} color="black" />
          </Button>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
