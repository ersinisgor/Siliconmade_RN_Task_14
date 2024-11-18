import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";
import { Products } from "../types/types";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { colors, padding_lg } from "../utils/constants";

const ProductScreen: React.FC = () => {
  const [products, setProducts] = useState<Products | null>(null);
  const isFocused = useIsFocused();
  const route = useRoute<{
    key: string;
    name: string;
    params: { categoryId: number; categoryName: string };
  }>();
  const { categoryId } = route.params;

  useEffect(() => {
    fetchProducts();
  }, [isFocused, categoryId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      );

      const data: Products = await response.json();

      const filteredProducts = data.filter(product =>
        product.images.some(image => image.startsWith("https://i.imgur"))
      );

      if (filteredProducts.length > 0) {
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const numColumns = 2;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.container} />
      <FlatList
        data={products || []}
        renderItem={({ item }) => <ListItem product={item} />}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
    // paddingHorizontal: padding_lg,
    padding: padding_lg,
  },
  columnWrapper: {
    gap: padding_lg,
  },
});
