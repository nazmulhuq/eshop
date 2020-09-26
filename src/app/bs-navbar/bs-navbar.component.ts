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
      let cart = new ShoppingCart(action);
      this.shoppingCartItemCount = cart.totalItemsCount;
    });
  }

  logout() {
    this.auth.logout();
  }
}
