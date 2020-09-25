import { ProductQuantityComponent } from "./product-quantity/product-quantity.component";
import { take } from "rxjs/operators";
import { Product } from "./models/product";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Injectable } from "@angular/core";

import { ShoppingCart } from "./models/shopping-cart";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime(),
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let value = JSON.parse(JSON.stringify(item.payload.val()));

        if (item.key) {
          let newQuantity = value.quantity + change;
          if (newQuantity === 0) item$.remove();
          else item$.update({ quantity: value.quantity + change });
        } else item$.set({ product: product, quantity: 1 });
      });
  }
}
