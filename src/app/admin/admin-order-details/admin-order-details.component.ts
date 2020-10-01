import { OrderStatus } from "./../../models/orderStatus";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrderService } from "src/app/order.service";

@Component({
  selector: "app-admin-order-details",
  templateUrl: "./admin-order-details.component.html",
  styleUrls: ["./admin-order-details.component.css"],
})
export class AdminOrderDetailsComponent implements OnInit {
  orderId: string;
  currentOrderStatus: string;
  orderStatusProcessing = OrderStatus.processing;
  orderStatusDelivered = OrderStatus.delivered;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
    this.subscription = this.orderService
      .getOrder(this.orderId)
      .subscribe((order) => {
        this.currentOrderStatus = order.value.orderStatus;
      });
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  changeOrderStatus(changedStatus: string) {
    console.log(changedStatus);
    this.orderService.changeOrderStatus(this.orderId, changedStatus);
  }
}
