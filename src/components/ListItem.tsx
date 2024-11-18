import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { cartStore } from "../store/cartStore";
import { ItemProduct } from "../types/types";
import { colors, padding, padding_lg, width } from "../utils/constants";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { RootStackParamList } from "../navigation/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "ProductDetail"> {}

const ListItem = ({ product }: ItemProduct) => {
  const navigation = useNavigation<Props["navigation"]>();
  const { addProduct, productList } = cartStore(s => s);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addToCart = () => {
    const isExist = productList.find(u => u.id == product.id);

    if (isExist) {
      Alert.alert("Error", "This product is already in the cart.");
    } else {
      addProduct(product);
      setIsModalVisible(true);
      setTimeout(() => setIsModalVisible(false), 2000);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const navigateToDetail = () => {
    navigation.navigate("ProductDetail", { product });
  };

  const navigateToCategory = () => {
    navigation.navigate("Products", {
      categoryId: product.category.id,
      categoryName: product.category.name,
    });
  };

  return (
    <View style={styles.item_container}>
      <Pressable onPress={navigateToDetail} style={styles.title_container}>
        <Text numberOfLines={2} style={styles.item_title}>
          {product.title}
        </Text>
      </Pressable>
      <Pressable onPress={navigateToCategory}>
        <Text style={styles.item_category}>{product.category.name}</Text>
      </Pressable>
      <Pressable onPress={navigateToDetail}>
        <View>
          <Image
            source={{ uri: product.images[0] }}
            style={styles.item_image}
          />
          <Pressable style={styles.heart_container} onPress={toggleFavorite}>
            <AntDesign
              name="heart"
              size={24}
              style={[styles.heart_icon, isFavorite && styles.heart_active]}
            />
          </Pressable>
        </View>
      </Pressable>
      <View style={styles.item_price_rate}>
        <Text style={styles.item_price}>${product.price}</Text>
      </View>
      <Button text="Add to Cart" onClick={addToCart} />

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modal_container]}>
          <View style={styles.modal_content}>
            <View style={styles.iconWrapper}>
              <AntDesign name="checkcircle" size={32} color="green" />
              <Text style={styles.modal_text}>Product added to cart</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  item_container: {
    width: (width - padding_lg * 3) / 2,
    marginBottom: padding_lg,
    backgroundColor: colors.background,
    borderRadius: 9,
    rowGap: 8,
    padding: padding,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title_container: {
    flex: 1,
  },
  iconWrapper: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  item_image: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
  },
  heart_container: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  heart_icon: {
    color: "white",
  },
  heart_active: {
    color: colors.fill,
  },
  item_title: {
    fontSize: 16,
    color: colors.primary,
    // flex: 1,
  },
  item_category: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  item_price: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.primary,
  },
  item_price_rate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modal_container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal_content: {
    width: "80%",
    minHeight: width / 3,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginTop: 10,
  },
});
