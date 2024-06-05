import colors from "@/constants/Colors";
import { Text } from "./Themed";
import { router } from "expo-router";
import React from "react";
import { Pressable, PressableProps, TextStyle } from "react-native";

// Define the types
type OnPressProps = {
  onPress: () => void;
  href?: never;
};

type HrefProps = {
  href: string;
  onPress?: never;
};

type ButtonProps = (OnPressProps | HrefProps) & {
  children: React.ReactNode;
  type?: "solid";
  textStyle?: TextStyle;
} & PressableProps;

export default function Button({
  children,
  href,
  onPress,
  type,
  textStyle,
  ...props
}: ButtonProps) {
  const handlePress = () => {
    if (href) {
      router.push(href);
    } else if (onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        type === "solid" && {
          backgroundColor: colors.blue,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 15,
          paddingVertical: 13,
          borderRadius: 15
        },
        pressed && { opacity: 0.8 }
      ]}
      {...props}
    >
{type === "solid" ?       <Text
        style={[
          { width: "100%", textAlign: "center" },
          type === "solid" && { color: "white", marginTop: 2 },
          textStyle,
        ]}
        type={type === "solid" ? "subtitle" : "default"}
      >
        {children}
      </Text>: children}
    </Pressable>
  );
}
