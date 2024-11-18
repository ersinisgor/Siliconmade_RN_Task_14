import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { colors } from "../utils/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";
import { Categories, Category } from "../types/types";
import ScreenTitle from "../components/ScreenTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryItem from "../components/CategoryItem";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "Products"> {}

const CategoryScreen: React.FC = () => {
  const [categories, setCategories] = useState<Categories | null>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation<Props["navigation"]>();

  useEffect(() => {
    fetchCategories();
  }, [isFocused]);

  const fetchCategories = async () => {
    try {
      const storedCategories = await AsyncStorage.getItem("categories");
      if (storedCategories) {
        setCategories(JSON.parse(storedCategories));
      } else {
        getCategoriesFromAPI();
      }
    } catch (error) {
      console.log("Error loading categories from local storage:", error);
    }
  };

  const getCategoriesFromAPI = () => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then(response => response.json())
      .then(categories => {
        const filteredCategories = (categories as Category[]).filter(
          category =>
            category.image && category.image.startsWith("https://i.imgur")
        );
        setCategories(filteredCategories);
        saveCategoriesToStorage(filteredCategories);
      })
      .catch(error => {
        console.log("Error fetching categories from API:", error);
      });
  };

  const saveCategoriesToStorage = async (categories: Categories) => {
    try {
      await AsyncStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.log("Error saving categories to local storage:", error);
    }
  };

  const navigateToProducts = (categoryId: number, categoryName: string) => {
    navigation.navigate("Products", { categoryId, categoryName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.container} />
      <ScreenTitle title="Categories" />
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem
            id={item.id}
            name={item.name}
            image={item.image}
            onPress={() => navigateToProducts(item.id, item.name)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.container,
  },
});
