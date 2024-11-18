import { create } from "zustand";
import { Product } from "../types/types";

interface Cart {
  productList: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  updateQuantity: (id: number, amount: number) => void;
}

const cartStore = create<Cart>(set => ({
  productList: [],
  addProduct: product =>
    set(state => ({
      productList: [...state.productList, product],
    })),
  removeProduct: id =>
    set(state => ({
      productList: state.productList.filter(product => product.id !== id),
    })),
  updateQuantity: (id, amount) =>
    set(state => ({
      productList: state.productList.map(product =>
        product.id === id ? { ...product, amount } : product
      ),
    })),
}));

export { cartStore };
