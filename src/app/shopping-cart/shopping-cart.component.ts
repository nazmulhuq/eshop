import { Subscription } from "rxjs";
import { ShoppingCart } from "./../models/shopping-cart";
import { ShoppingCartService } from "./../shopping-cart.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit {
  subscription: Subscription;
  cart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.snapshotChanges().subscribe((action) => {
      this.cart = new ShoppingCart(action);
    });
  }
}
