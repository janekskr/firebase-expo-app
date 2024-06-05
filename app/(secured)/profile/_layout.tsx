import React from "react";
import { Stack } from "expo-router";
import { Text } from "@/components";
import { useUser } from "@/providers/FirebaseProvider";

export default function ProfileLayout() {
  const user = useUser();
  return (
    <Stack
    initialRouteName="index"
    screenOptions={{
        headerShadowVisible: false
    }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => (
            <Text
              type="header"
              style={{
                backgroundColor: "white",
                marginTop: 4,
              }}
            >
              {user!.displayName}
            </Text>
          ),
        }}
      />
      <Stack.Screen name="edit" options={{
          headerTitle: () => (
            <Text
              type="header"
              style={{
                backgroundColor: "white",
                marginTop: 4,
              }}
            >
              Edytuj profil
            </Text>
          ),
        }}/>
    </Stack>
  );
}
