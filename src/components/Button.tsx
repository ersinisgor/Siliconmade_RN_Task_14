import { Pressable, StyleSheet, Text } from "react-native";
import { colors, padding } from "../utils/constants";

interface IButton {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ text, onClick, disabled }: IButton) => {
  return (
    <Pressable
      style={
        disabled
          ? styles.disabled_container
          : text === "Login"
          ? styles.login_container
          : styles.btn_container
      }
      onPress={() => onClick()}
    >
      <Text
        style={
          disabled
            ? styles.disabled_text
            : text === "Login"
            ? styles.login_text
            : styles.btn_text
        }
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn_container: {
    backgroundColor: colors.text,
    padding: padding,
    borderRadius: 9,
  },
  btn_text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  disabled_container: {
    backgroundColor: colors.inactive,
    padding: padding,
    borderRadius: 9,
    marginTop: 20,
  },
  disabled_text: {
    color: colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  login_container: {
    backgroundColor: colors.container,
    padding: padding,
    borderRadius: 9,
    marginTop: 32,
  },
  login_text: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
