import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, padding } from "../utils/constants";

interface ScreenTitleProps {
  title: string;
}

const ScreenTitle: React.FC<ScreenTitleProps> = ({ title }) => {
  return <Text style={styles.screen_title}>{title}</Text>;
};

export default ScreenTitle;

const styles = StyleSheet.create({
  screen_title: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: "bold",
    marginVertical: padding,
    textAlign: "center",
  },
});
