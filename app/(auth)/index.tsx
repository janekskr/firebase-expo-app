import { Button, StyleSheet, Pressable } from "react-native";

import { useRouter } from "expo-router";

import useUser from "@/hooks/useUser";
import{Text,View} from "@/components"

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text type="title">Witaj</Text>
      <Text type="subtitle">Zaloguj sie lub utwórz konto</Text>
      <View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
