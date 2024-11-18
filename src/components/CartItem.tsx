import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from "../utils/constants";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    images: string[];
    price: number;
    amount?: number;
  };
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.amountRow}>
          <View style={styles.amountContainer}>
            <Pressable onPress={() => onDecrease(item.id)}>
              <AntDesign name="minus" size={16} color={colors.secondary} />
            </Pressable>
            <Text style={styles.amountText}>{item.amount || 1}</Text>
            <Pressable onPress={() => onIncrease(item.id)}>
              <AntDesign name="plus" size={16} color={colors.secondary} />
            </Pressable>
          </View>
          <Text style={styles.productPrice}>
            ${(item.price * (item.amount || 1)).toFixed(2)}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.id)}>
        <MaterialIcons name="delete" size={24} color={colors.secondary} />
      </Pressable>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  productImage: {
    width: 68,
    height: 68,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: colors.secondary,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
});
