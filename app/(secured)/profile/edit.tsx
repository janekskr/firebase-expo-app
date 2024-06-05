import { Button, Container, ProfilePicture, Text, View } from "@/components";
import colors from "@/constants/Colors";
import { useUser } from "@/providers/FirebaseProvider";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function EditProfileScreen() {
  const user = useUser();

  if (!user) return null;

  return (
    <Container>
      <View
        style={{
          padding: 20,
          borderColor: colors.gray,
          borderRadius: 20,
          borderWidth: 1,
          gap: 25,
        }}
      >
        <Text style={{ fontSize: 19 }}>Edytuj profil użytkownika</Text>
        <View style={{ gap: 10 }}>
          <Pressable
            onPress={() => router.push("(secured)/profile/photo")}
            style={({ pressed }) => [
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              pressed && { opacity: 0.7, ransform: [{ scale: 0.99 }] },
            ]}
          >
            <Text style={{ fontSize: 16 }}>Zdjęcie profilowe</Text>
            <ProfilePicture src={user.photoURL} width={40} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              pressed && { opacity: 0.7, ransform: [{ scale: 0.99 }] },
            ]}
            onPress={() => router.push("(secured)/profile/username")}
          >
            <Text style={{ fontSize: 16 }}>Nazwa użytkownika</Text>
            <Text type="initials" weight="bold" style={{ fontSize: 15 }}>
              {user.displayName}
            </Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
}
