import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible, ExternalLink, ParallaxScrollView, Text, View } from "@/components";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <View style={styles.titleContainer}>
        <Text type="title">Explore</Text>
      </View>
      <Text>This app includes example code to help you get started.</Text>
      <Collapsible title="File-based routing">
        <Text>
          This app has two screens:{" "}
          <Text weight="semibold">app/(tabs)/index.tsx</Text> and{" "}
          <Text weight="semibold">app/(tabs)/explore.tsx</Text>
        </Text>
        <Text>
          The layout file in{" "}
          <Text weight="semibold">app/(tabs)/_layout.tsx</Text> sets up the
          tab navigator.
        </Text>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <Text type="link">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <Text>
          You can open this project on Android, iOS, and the web. To open the
          web version, press <Text weight="semibold">w</Text> in the
          terminal running this project.
        </Text>
      </Collapsible>
      <Collapsible title="Images">
        <Text>
          For static images, you can use the{" "}
          <Text weight="semibold">@2x</Text> and{" "}
          <Text weight="semibold">@3x</Text> suffixes to provide files for
          different screen densities
        </Text>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <Text type="link">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <Text>
          Open <Text weight="semibold">app/_layout.tsx</Text> to see how to
          load{" "}
          <Text style={{ fontFamily: "SpaceMono" }}>
            custom fonts such as this one.
          </Text>
        </Text>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <Text type="link">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <Text>
          This template has light and dark mode support. The{" "}
          <Text weight="semibold">useColorScheme()</Text> hook lets you
          inspect what the user's current color scheme is, and so you can adjust
          UI colors accordingly.
        </Text>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <Text type="link">Learn more</Text>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <Text>
          This template includes an example of an animated component. The{" "}
          <Text weight="semibold">components/HelloWave.tsx</Text> component
          uses the powerful{" "}
          <Text weight="semibold">react-native-reanimated</Text> library to
          create a waving hand animation.
        </Text>
        {Platform.select({
          ios: (
            <Text>
              The{" "}
              <Text weight="semibold">
                components/ParallaxScrollView.tsx
              </Text>{" "}
              component provides a parallax effect for the header image.
            </Text>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
