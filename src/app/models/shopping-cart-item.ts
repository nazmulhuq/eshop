import { Product } from "./product";
export class ShoppingCartItem {
  product: Product;
  quantity: number;

  constructor(product?: Product, quantity?: number) {
    this.product = new Product();
    this.product = product;
    this.quantity = quantity;
  }

  get totalPrice(): number {
    return this.product.value.price * this.quantity;
  }
}
