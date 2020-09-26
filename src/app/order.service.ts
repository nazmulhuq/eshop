import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { Order } from "./models/order";
import { ShoppingCartService } from "./shopping-cart.service";

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
}
