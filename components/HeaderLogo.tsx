import { Logo } from "@/assets";
import { View } from "./Themed";

export default function HeaderLogo() {
  return (
    <View
      style={{ paddingHorizontal: 30, paddingVertical: 15 }}
    >
      <Logo  />
    </View>
  );
}
