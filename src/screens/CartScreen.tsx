import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore } from "zustand";
import { cartStore } from "../store/cartStore";
import { colors } from "../utils/constants";
import CartItem from "../components/CartItem";
import ScreenTitle from "../components/ScreenTitle";

const CartScreen: React.FC = () => {
  const { productList, updateQuantity, removeProduct } = useStore(cartStore);

  const handleIncrease = (id: number) => {
    const product = productList.find(item => item.id === id);
    if (product) {
      const newAmount = (product.amount || 1) + 1;
      updateQuantity(id, newAmount);
    }
  };

  const handleDecrease = (id: number) => {
    const product = productList.find(item => item.id === id);
    if (product && (product.amount || 1) > 1) {
      const newAmount = (product.amount || 1) - 1;
      updateQuantity(id, newAmount);
    }
  };

  const totalPrice = productList.reduce(
    (sum, item) => sum + item.price * (item.amount || 1),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScreenTitle title="Shopping Cart" />
      <FlatList
        data={productList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={removeProduct}
          />
        )}
      />
      {/* Footer for Total Price and Checkout Button */}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 30,
    backgroundColor: colors.background,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  checkoutText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: "bold",
  },
});
