import { mapper } from "./../helpers/mapper";
import { ShoppingCartService } from "./../shopping-cart.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "../models/app.user";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"],
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;
  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((user) => (this.appUser = user));
    let cart$ = await this.shoppingCartService.getCart();
    cart$.snapshotChanges().subscribe((action) => {
      let cart: ShoppingCart = action.payload.val();
      this.shoppingCartItemCount = cart.totalItemsCount;
      mapper.mapToShoppingCart(action);
      alert(
        `bs-navbar: update mapper
         and take away the cart item counting code to ShoppingCart property `
      );

      //counting cart item quantity

      this.shoppingCartItemCount = 0;
      for (let productId in cart.items)
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }

  logout() {
    this.auth.logout();
  }
}
