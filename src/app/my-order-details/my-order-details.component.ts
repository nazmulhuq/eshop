import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-my-order-details",
  templateUrl: "./my-order-details.component.html",
  styleUrls: ["./my-order-details.component.css"],
})
export class MyOrderDetailsComponent implements OnInit {
  orderId: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get("id");
  }
}
