import { Button, Container, ProfilePicture, Text, View } from "@/components";
import colors from "@/constants/Colors";
import { obfuscateEmail } from "@/lib/utils";
import { useUser } from "@/providers/FirebaseProvider";

export default function ProfileScreen() {
  const user = useUser();

  if (!user) return null;

  return (
    <Container style={{ gap: 30 }}>
      <View
        style={{
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: colors.blue,
            aspectRatio: 2.5,
          }}
        ></View>
        <View
          style={{
            borderTopWidth: 0,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
            borderWidth: 1,
            borderColor: colors.gray,
            padding: 20,
            alignItems: "center",
          }}
        >
          <ProfilePicture
            width={100}
            style={{ marginTop: -100, marginBottom: 5 }}
            src={user.photoURL}
          />
          <Text type="subtitle" style={{ textTransform: "capitalize" }}>
            {user.displayName}
          </Text>
          <Text style={{ fontSize: 15 }}>
            Użytkownik od:{" "}
            {new Date(user.metadata.creationTime!).toLocaleDateString()}
          </Text>
          <Text
            style={{ fontSize: 15, color: colors.gray, textAlign: "center" }}
          >
            <Text weight="bold" style={{ color: colors.gray }}>
              id:{" "}
            </Text>{" "}
            {user.uid}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 20,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.gray,
        }}
      >
        <View>
          <Text style={{ fontSize: 17 }}>Email: </Text>
          <Text weight="bold" style={{ fontSize: 17 }}>
            {obfuscateEmail(user.email!)}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button href="(secured)/profile/edit" type="solid">
          Edytuj konto
        </Button>
      </View>
    </Container>
  );
}
