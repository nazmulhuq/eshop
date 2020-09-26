import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";
import { ShoppingCart } from "./../models/shopping-cart";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { Order } from "../models/order";
import { ShoppingCartService } from "../shopping-cart.service";
import { OrderService } from "../order.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  userId: string;
  cart: ShoppingCart;
  shipping: any;
  userSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.snapshotChanges().subscribe((action) => {
      this.cart = new ShoppingCart(action);
    });
    this.userSubscription = this.auth.user$.subscribe((user) => {
      this.userId = user.uid;
    });
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }

  save(formData: any) {
    this.shipping = formData;

    this.placeOrder();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
