import { Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const padding = 12;
const padding_lg = 20;
const item_width = width / 2 - padding * 4;
const colors = {
  primary: "#22223b",
  secondary: "#9a8c98",
  background: "#f2e9e4",
  fill: "#FF4C4C",
  text: "#4a4e69",
  container: "#c9ada7",
  inactive: "#bbb",
};

export { width, padding, padding_lg, item_width, colors };
