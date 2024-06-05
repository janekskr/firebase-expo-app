import { Button, Container } from "@/components";
import { logout } from "@/providers/FirebaseProvider";

export default function TabTwoScreen() {
  return (
    <Container>
      <Button onPress={logout} type="solid">
        Wyloguj się
      </Button>
    </Container>
  );
}