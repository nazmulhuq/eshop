import { AuthService } from "./../auth.service";
import { Observable, Subscription } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrderService } from "../order.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"],
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  orders$: Observable<any[]>;
  subscription: Subscription;

  constructor(private orderService: OrderService, private auth: AuthService) {}

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe((user) => {
      this.orders$ = this.orderService.getOrders(user.uid);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
