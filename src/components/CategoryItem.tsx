import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { colors, padding, width } from "../utils/constants";

interface CategoryItemProps {
  id: number;
  name: string;
  image: string;
  onPress: (categoryId: number) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  id,
  name,
  image,
  onPress,
}) => (
  <Pressable style={styles.categoryContainer} onPress={() => onPress(id)}>
    <Image source={{ uri: image }} style={styles.categoryImage} />
    <Text style={styles.categoryName}>{name}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 1,
  },
  categoryImage: {
    width: width / 2,
    height: width / 2,
  },
  categoryName: {
    fontSize: 16,
    color: colors.primary,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: padding,
    fontWeight: "500",
  },
});

export default CategoryItem;
