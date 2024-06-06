import { ViewStyle } from "react-native";
import { Image } from "expo-image";

interface ProfilePictureProps {
  style?: ViewStyle;
  width: number;
  src?: string | null;
}

export default function ProfilePicture({
  width,
  src,
  style,
}: ProfilePictureProps) {

  return (
    <Image
      source={src ?? require("@/assets/images/icons/avatar.avif")}
      style={[
        {
          width,
          aspectRatio: 1 / 1,
          borderRadius: 999,
        },
        style as any,
      ]}
      contentFit="cover"
      cachePolicy={src ? "none": "disk"}
    />
  );
}