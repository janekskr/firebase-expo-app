import { Colors } from "@/constants";
import { useColorScheme } from "react-native";

export default function useThemeColor() {
  // const theme = useColorScheme() ?? 'light';
  const theme = "light"
  
  return Colors[theme];
}
