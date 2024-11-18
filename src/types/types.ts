export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  amount: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export type Categories = Category[];
export type Products = Product[];
export type ItemProduct = { product: Product };
