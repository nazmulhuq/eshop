import { Component, Input } from "@angular/core";
import { ShoppingCart } from "../models/shopping-cart";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"],
})
export class ProductQuantityComponent {
  @Input("product") product;
  @Input("shopping-cart") shoppingCart: ShoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
