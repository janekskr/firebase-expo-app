import colors from "@/constants/Colors";
import { Text, ViewProps } from "./Themed";
import { router } from "expo-router";
import React from "react";
import { Pressable, TextStyle } from "react-native";

export default function RedirectButton({
  children,
  href,
  type,
  textStyle,
  ...props
}: {
  children: React.ReactNode;
  href: any;
  type?: "solid";
  textStyle?: TextStyle;
} & ViewProps) {
  return (
    <Pressable
      onPress={() => router.push(href)}
      style={({ pressed }) => [
        type === "solid" && {
          backgroundColor: colors.blue,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 15
        },
        pressed && { opacity: 0.8 }
      ]}
      {...props}
    >
      <Text style={[{ width: "100%", textAlign: "center" }, textStyle, type === "solid" && { color: "white", marginTop: 4 },]} type="subtitle">{children}</Text>
    </Pressable>
  );
}
