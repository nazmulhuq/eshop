import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Order } from "./models/order";
import { ShoppingCartService } from "./shopping-cart.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order: Order) {
    let result = await this.db.list("/orders").push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(appUserId?: string) {
    if (appUserId) {
      console.log("user id");
      return this.db
        .list("/orders", (ref) => ref.orderByChild("userId").equalTo(appUserId))
        .snapshotChanges()
        .pipe(
          map((changes) => {
            return changes.map((item) => ({
              key: item.payload.key,
              value: item.payload.val(),
            }));
          })
        );
    }

    return this.db
      .list("/orders", (ref) => ref.orderByChild("orderStatus"))
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((item) => ({
            key: item.payload.key,
            value: item.payload.val(),
          }));
        })
      );
  }

  getOrder(id: string) {
    return this.db
      .object("/orders/" + id)
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return { key: changes.payload.key, value: changes.payload.val() };
        })
      );
  }

  changeOrderStatus(orderId: string, changedStatus: string) {
    console.log(changedStatus);
    this.db.object("/orders/" + orderId).update({ orderStatus: changedStatus });
  }
}
