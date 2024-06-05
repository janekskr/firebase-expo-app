import { router } from "expo-router";

import {
  Input,
  Button,
  Text,
  ParallaxScrollView,
} from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@/lib/types";
import colors from "@/constants/Colors";
import { LoginSvg } from "@/assets";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/providers/FirebaseProvider";

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: (body: SignInSchema) => login(body),
    onSuccess: () => router.replace("(tabs)"),
    onError: () => reset(),
  })
  
  const onSubmit = (body: SignInSchema) => mutation.mutate(body)

  return (
    <ParallaxScrollView
      style={{ height: 400, marginTop: 50 }}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<LoginSvg />}
    >
      <Text
        type="title"
        style={{ alignSelf: "flex-start", color: colors.navy }}
      >
        Zaloguj się
      </Text>
      <Input
        controls={{
          control,
          errors,
        }}
        name="email"
        placeholder="Email"
        inputMode="email"
        icon="at-sign"
        style={{ width: "100%" }}
      />
      <Input
        controls={{
          control,
          errors,
        }}
        name="password"
        icon="lock"
        placeholder="Hasło"
        secureTextEntry
        style={{ width: "100%" }}
      />

      <Button
        type="solid"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        Zaloguj się
      </Button>
    <Button href="/(auth)/register" style={{alignItems: 'center'}}>
        <Text  style={{fontSize: 16}}>Nie posiadasz konta?</Text>
        <Text weight="bold" type="link" style={{fontSize: 16}}>
          Zarejestruj się
        </Text>
      </Button>
    </ParallaxScrollView>
  );
}