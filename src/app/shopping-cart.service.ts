import { take } from "rxjs/operators";
import { Product } from "./models/product";
import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { asapScheduler } from "rxjs";

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

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId);
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

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item) => {
        let value = JSON.parse(JSON.stringify(item.payload.val()));

        if (item.key) item$.update({ quantity: value.quantity + change });
        else item$.set({ product: product, quantity: 1 });
      });
  }
}
