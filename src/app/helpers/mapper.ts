import { SnapshotAction } from "angularfire2/database";
import { Product } from "../models/product";
import { ShoppingCart } from "../models/shopping-cart";

export class mapper {
  static mapToProduct(item: SnapshotAction<unknown>): Product {
    let product: Product = {
      key: null,
      value: {
        title: null,
        price: null,
        category: null,
        imageUrl: null,
      },
    };
    let value = item.payload.val();
    let jsonValue = JSON.parse(JSON.stringify(value));

    product.key = item.payload.key;
    product.value.title = jsonValue.title;
    product.value.price = jsonValue.price;
    product.value.category = jsonValue.category;
    product.value.imageUrl = jsonValue.imageUrl;

    return product;
  }

  static mapToShoppingCart(actionCart: SnapshotAction<ShoppingCart>) {
    let value = actionCart.payload.val();
    let cart = new ShoppingCart();
    console.log(value);
  }
}
