import { Redirect, Tabs, router } from "expo-router";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import colors from "@/constants/Colors";
import { useUser } from "@/providers/FirebaseProvider";
import { Button, HelloWave, ProfilePicture, Text, View } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const user = useUser();
  const { top } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.blue,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
          header: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingTop: 5 + top,
                paddingBottom:5,
                alignItems: "center"
              }}
            >
              <View
                style={{ alignItems: "center", gap: 8, flexDirection: "row" }}
              >
                <Text type="header" style={{textTransform: "capitalize"}}>Cześć {user?.displayName}</Text>
                <HelloWave />
              </View>
              <Button onPress={() => router.push("(secured)/profile")}>
                <ProfilePicture width={50} src={user?.photoURL} />
              </Button>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={35}
            />
          ),
          header: () => (
            <Text
              type="header"
              style={{
                backgroundColor: "white",
                paddingHorizontal: 20,
                paddingBottom: 10,
                paddingTop: 10 + top,
              }}
            >
              Stwórz posta
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
          header: () => (
            <Text
              type="header"
              style={{
                backgroundColor: "white",
                paddingHorizontal: 20,
                paddingBottom: 10,
                paddingTop: 10 + top,
              }}
            >
              Ustawienia
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
