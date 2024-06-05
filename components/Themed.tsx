import colors from "@/constants/Colors";
import { useThemeColor } from "@/hooks";
import { Weights } from "@/lib/types";
import {
  Text as DefaultText,
  View as DefaultView,
  StyleSheet,
} from "react-native";

export type TextProps = {
  weight?: Weights;
  type?: "default" | "title" | "subtitle" | "link" | "header" | "initials"
} & DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, weight = "medium", type = "regular", ...otherProps } = props;
  const theme = useThemeColor();
  return (
    <DefaultText
      style={[
        { color: theme.text, fontFamily: `poppins_${(["title", "subtitle", "header"].includes(type)) ? "bold" : weight}` },
        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "link" && styles.link,
        type === "header" && { fontSize: 24 },
        type === "initials" && {textTransform: "capitalize"},
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
    fontSize: 30,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
  },
  link: {
    color: colors.blue,
  },
});
