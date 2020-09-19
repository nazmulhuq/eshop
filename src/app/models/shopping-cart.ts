import { SnapshotAction } from "angularfire2/database";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  public dateCreated: string;
  public items: ShoppingCartItem[];

  constructor(actionCart?: SnapshotAction<ShoppingCart>) {
    if (actionCart) {
      let value = actionCart.payload.val();
      this.items = value.items;
      this.dateCreated = value.dateCreated;
    }
  }

  get totalItemsCount(): number {
    let count = 0;
    for (let productId in this.items) count += this.items[productId].quantity;
    return count;
  }

  get productIds() {
    return Object.keys(this.items);
  }
}
