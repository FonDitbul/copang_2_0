import { Cart } from "../../interface/Cart";
import { Product } from "../../interface/Product";

type CartWithProduct = {
  Product: Product;
} & Cart;

export const cartWithProduct = (cart: Cart): CartWithProduct => {
  if (!cart.Product) {
    throw new Error("no Product Information");
  }
  return cart as CartWithProduct;
};

export const calculateCartCost = (cart: Cart) => {
  const copyCart = cartWithProduct(cart);
  return calculateCost(copyCart.Product.cost, copyCart.productQuantity);
};

export const calculateCost = (cost: number, productQuantity: number) => {
  return cost * productQuantity;
};
