import React, { PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { View } from "./Themed";

export default function Container({
  children,
  style,
}: { style?: ViewStyle } & PropsWithChildren) {
  return (
    <View
      style={[{ paddingVertical: 20, paddingBottom: 40, paddingHorizontal: 30, flex: 1, backgroundColor: "white" }, style]}
    >
      {children}
    </View>
  );
}
