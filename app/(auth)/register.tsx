import { DirectionsSvg } from "@/assets";
import {
  Button,
  Input,
  ParallaxScrollView,
  Text,
  View,
} from "@/components";
import colors from "@/constants/Colors";
import { SignUpSchema, signUpSchema } from "@/lib/types";
import { signUp } from "@/providers/FirebaseProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: (body: SignUpSchema) => signUp(body),
    onSuccess: () => router.replace("(tabs)"),
    onError: () => reset(),
  })
  
  const onSubmit = (body: SignUpSchema) => mutation.mutate(body)

  return (
    <ParallaxScrollView
      style={{ height: 400, marginTop: 50 }}
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<DirectionsSvg />}
    >
      <Text
        type="title"
        style={{ alignSelf: "flex-start", color: colors.navy, marginTop: -20 }}
      >
        Zarejestruj się
      </Text>
      <Input
        controls={{
          control,
          errors,
        }}
        name="username"
        placeholder="Nazwa użytkownika"
        icon="user"
        style={{ width: "100%" }}
      />
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
      <Input
        controls={{
          control,
          errors,
        }}
        name="passwordConfirm"
        icon="unlock"
        placeholder="Powtórz hasło"
        secureTextEntry
        style={{ width: "100%" }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Controller
            control={control}
            name="privacy_policy"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                value={value}
                onValueChange={onChange}
                id="privacy_policy"
                color={value === true ? colors.blue : undefined}
                style={{ padding: 10, }}
              />
            )}
          />
          <Button onPress={() => {}}>
            <Text>Akceptuję{" "}</Text>
            <Text
              weight="bold"
              style={{
                color: colors.blue,
                textDecorationColor: colors.blue,
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
              }}
            >
              Politykę prywatności
            </Text>
          </Button>
        </View>
        {errors.privacy_policy && (
          <Text style={{ color: "red", alignSelf: "flex-start" }}>
            {errors.privacy_policy?.message as string}
          </Text>
        )}
      </View>
      <Button type="solid" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <Text>Zarejestruj się</Text>
      </Button>
    </ParallaxScrollView>
  );
}