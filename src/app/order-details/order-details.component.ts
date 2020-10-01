import { Observable } from "rxjs";
import { Component, Input, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { OrderStatus } from "../models/orderStatus";

@Component({
  selector: "order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<any>;

  @Input("orderId") id: string;
  orderStatusProcessing = OrderStatus.processing;
  orderStatusDelivered = OrderStatus.delivered;
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.order$ = this.orderService.getOrder(this.id);
  }
}
