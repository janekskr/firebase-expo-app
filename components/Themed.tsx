import { useThemeColor } from "@/hooks";
import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
} from "react-native";

export type Weights =
  | "black"
  | "bold"
  | "italic"
  | "light"
  | "semibold"
  | "medium"
  | "extrabold"
  | "regular";

export type TextProps = {
  weight?: Weights;
  type?: "default" | "title" | "subtitle" | "link";
} & DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, weight = "medium", type = "regular", ...otherProps } = props;
  const theme = useThemeColor();
  return (
    <DefaultText
      style={[
        { color: theme.text, fontFamily: `poppins_${(type === "title" || type === "subtitle") ? "bold" : weight}` },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        style,
      ]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const theme = useThemeColor();

  return (
    <DefaultView
      style={[{ backgroundColor: theme.background }, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
