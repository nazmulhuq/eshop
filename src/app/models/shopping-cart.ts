import { SnapshotAction } from "angularfire2/database";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  public dateCreated: string;
  public items: ShoppingCartItem[] = [];

  constructor(actionCart?: SnapshotAction<ShoppingCart>) {
    if (actionCart) {
      let value = actionCart.payload.val();
      let itemsMap: ShoppingCartItem[] = value.items;

      for (let productId in itemsMap) {
        let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }

      this.dateCreated = value.dateCreated;
    }
  }

  get totalItemsCount(): number {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }
  get totalPrice(): number {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].totalPrice;
    return count;
  }

  get productIds() {
    return Object.keys(this.items);
  }
}
