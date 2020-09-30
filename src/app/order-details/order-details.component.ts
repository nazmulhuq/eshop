import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { OrderStatus } from "../models/orderStatus";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"],
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<any>;
  id: string;
  orderStatusProcessing = OrderStatus.processing;
  orderStatusDelivered = OrderStatus.delivered;
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.order$ = this.orderService.getOrder(this.id);
    this.order$.subscribe((x) => console.log(x));
  }
}
