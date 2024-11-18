import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListItem from "../components/ListItem";
import { Products } from "../types/types";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { colors, padding, padding_lg } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenTitle from "../components/ScreenTitle";
import Entypo from "@expo/vector-icons/Entypo";
import { RootStackParamList } from "../navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Props extends NativeStackScreenProps<RootStackParamList, "Login"> {}

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Products | null>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation<Props["navigation"]>();

  useEffect(() => {
    fetchProducts();
  }, [isFocused]);

  const fetchProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem("products");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        getProductsFromAPI();
      }
    } catch (error) {
      console.log("Error loading products from local storage:", error);
    }
  };

  const getProductsFromAPI = () => {
    fetch("https://api.escuelajs.co/api/v1/products?offset=0&limit=31")
      .then(products => products.json())
      .then(products => {
        const response = products as Products;
        const filteredProducts = response.filter(product =>
          product.images.some(image => image.startsWith("https://i.imgur"))
        );
        if (filteredProducts.length > 0) {
          setProducts(filteredProducts);
          saveProductsToStorage(filteredProducts);
        }
      })
      .catch(error => {
        console.log("Error fetching products from API:", error);
      });
  };

  const saveProductsToStorage = async (products: Products) => {
    try {
      await AsyncStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      console.log("Error saving products to local storage:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      Alert.alert("Logout", "You have been logged out.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const numColumns = 2;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={styles.home_container}
    >
      <StatusBar barStyle="dark-content" backgroundColor={colors.container} />

      {/* Logout Icon */}
      <View style={styles.logoutIconContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Entypo name="log-out" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScreenTitle title="Products" />
      <FlatList
        data={products || []}
        renderItem={({ item }) => <ListItem product={item} />}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        keyExtractor={product => product.id.toString()}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  home_container: {
    backgroundColor: colors.container,
    flex: 1,
    paddingHorizontal: padding_lg,
  },
  columnWrapper: {
    gap: padding_lg,
  },
  logoutIconContainer: {
    marginTop: 10,
    marginBottom: -padding,
    alignItems: "flex-end",
  },
});
