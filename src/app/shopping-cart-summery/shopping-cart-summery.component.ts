import { ShoppingCart } from "./../models/shopping-cart";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "shopping-cart-summery",
  templateUrl: "./shopping-cart-summery.component.html",
  styleUrls: ["./shopping-cart-summery.component.css"],
})
export class ShoppingCartSummeryComponent implements OnInit {
  @Input("shooping-cart") shoppingCart: ShoppingCart;
  constructor() {}

  ngOnInit() {}
}
