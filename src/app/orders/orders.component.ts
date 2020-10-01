import { Observable } from "rxjs";

import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  @Input("orders") orders$: Observable<any[]>;
  @Input("manage") manage = false;
  isAdmin = "false";
  detailsLink: string;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.appUser$.subscribe((user) => {
      if (user.isAdmin === "true") this.detailsLink = "/admin/order-details/";
      else this.detailsLink = "/my/order-details/";
    });
  }
}
