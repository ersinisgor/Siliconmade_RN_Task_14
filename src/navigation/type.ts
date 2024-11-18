import { Product } from "../types/types";

export type RootStackParamList = {
  ProductDetail: { product: Product };
  Products: { categoryId: number; categoryName: string };
  Login: undefined;
  Tabs: undefined;
};
