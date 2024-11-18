import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  View,
  Image,
  Pressable,
  Text,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";
import Button from "../components/Button";
import { colors } from "../utils/constants";
import Feather from "@expo/vector-icons/Feather";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface Props extends NativeStackScreenProps<RootStackParamList, "Tabs"> {}

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<Props["navigation"]>();
  const [email, setEmail] = useState("john@mail.com");
  const [password, setPassword] = useState("changeme");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const updateSecureTextEntry = () => {
    setSecureTextEntry(prev => !prev);
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data: LoginResponse = await response.json();

      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    } catch (error) {
      Alert.alert(
        "Login Failed",
        "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require("../../assets/icon.png")}
        ></Image>
      </View>
      <Text style={styles.input_label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.input_label}>Password</Text>
      <View style={styles.password_container}>
        <TextInput
          style={styles.password_input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
        <Pressable onPress={updateSecureTextEntry}>
          <Feather
            name={secureTextEntry ? "eye-off" : "eye"}
            size={20}
            color={colors.primary}
          />
        </Pressable>
      </View>
      <Button
        text={loading ? "Logging in..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  input_label: {
    color: colors.background,
    marginBottom: 8,
  },
  password_container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: colors.background,
  },
  password_input: {
    flex: 1,
  },
  logo_container: {
    alignItems: "center",
    marginBottom: -32,
  },
  logo: {
    height: 300,
    width: 300,
  },
});
