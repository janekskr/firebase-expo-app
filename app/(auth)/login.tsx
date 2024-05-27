import React, { useState } from "react";
import { TextInput, Pressable, StyleSheet } from "react-native";

import { Link, router } from "expo-router";

import {useUser} from "@/hooks";
import{Text,View} from "@/components"


export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useUser();

  const handleLogin = () => {
    try {
      login({ email, password });
      router.replace("(tabs)")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Pressable onPress={handleLogin} style={{ backgroundColor: "white" }}>
        <Text>Zaloguj się</Text>
      </Pressable>
      <Link href="/(auth)/register">Don't have an account? Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    color: "white",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
