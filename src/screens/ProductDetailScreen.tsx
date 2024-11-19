import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Modal,
  StatusBar,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Product } from "../types/types";
import { colors, width } from "../utils/constants";
import { cartStore } from "../store/cartStore";
import Button from "../components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/type";

interface Props
  extends NativeStackScreenProps<RootStackParamList, "Products"> {}

const ProductDetail: React.FC = () => {
  const route = useRoute();
  const { product } = route.params as { product: Product };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addProduct, productList } = cartStore(state => state);
  const navigation = useNavigation<Props["navigation"]>();

  const onScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleAddToCart = () => {
    const isExist = productList.find(product => product.id === product.id);
    if (isExist) {
      Alert.alert("Error", "This product is already in the cart.");
    } else {
      addProduct(product);
      setIsModalVisible(true);
      setTimeout(() => setIsModalVisible(false), 2000);
    }
  };

  const navigateToCategory = () => {
    navigation.navigate("Products", {
      categoryId: product.category.id,
      categoryName: product.category.name,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c2e43" />
      {/* Image Carousel */}
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {product.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Product Details */}
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.category}>
        Category:{" "}
        <Text style={styles.category_name} onPress={navigateToCategory}>
          {product.category.name}
        </Text>
      </Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      {/* Add to Cart Button */}
      <View style={styles.buttonContainer}>
        <Button text="Add to Cart" onClick={handleAddToCart} />
      </View>

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

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
  },
  image: {
    width: width,
    height: 300,
    resizeMode: "contain",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.container,
  },
  inactiveDot: {
    backgroundColor: colors.text,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: colors.container,
  },
  category: {
    fontSize: 18,
    color: colors.container,
  },
  category_name: {
    fontSize: 18,
    color: colors.container,
    textDecorationLine: "underline",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.background,
    marginVertical: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.secondary,
  },
  buttonContainer: {
    marginTop: 20,
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
  iconWrapper: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
