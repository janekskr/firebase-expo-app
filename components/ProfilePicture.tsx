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
      source={src ?? "https://avatar.iran.liara.run/public/boy?username=Ash"}
      style={[
        {
          width,
          aspectRatio: 1 / 1,
          borderRadius: 999,
        },
        style as any,
      ]}
      contentFit="cover"
      cachePolicy="none"
    />
  );
}