import { Container, Button, Text, View } from "@/components";
import { LoginSvg, LogoSvg } from "@/assets";
import {  FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const {top} = useSafeAreaInsets();
  return (
    <Container style={{paddingTop: top + 20}}>
      <LogoSvg style={{ alignSelf: "flex-start" }} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
      <Text style={{ fontSize: 35, textAlign: "center" }} weight="bold">
        Dziel się z innnymi swoimi przeżyciami!
      </Text>
      <LoginSvg />
      <Button type="solid" href="/login">Dalej{"  "}<FontAwesome name="arrow-right" size={24} color="white" /></Button>
      </View>
    </Container>
  );
}
