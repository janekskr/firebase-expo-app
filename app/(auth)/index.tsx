import { StyleSheet } from "react-native";


import { RedirectButton, Text, View } from "@/components";
import { LoginSvg, LogoSvg } from "@/assets";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LogoSvg style={{ alignSelf: "flex-start" }} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
      <Text style={{ fontSize: 35, textAlign: "center" }} weight="bold">
        Dziel się z innnymi swoimi przeżyciami!
      </Text>
      <LoginSvg />
      <RedirectButton type="solid" href="/login">Dalej <FontAwesome name="arrow-right" size={24} color="white" /></RedirectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
