import { Subscription } from "rxjs";
import { ProductService } from "./../product.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../models/product";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: ShoppingCart;
  category: string;
  private subscription: Subscription;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.productService
      .getAllProducts()
      .subscribe(
        (products) => (this.filteredProducts = this.products = products)
      );

    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get("category");

      this.filteredProducts = this.category
        ? this.products.filter((p) => p.value.category === this.category)
        : this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .snapshotChanges()
      .subscribe((cart) => {
        this.cart = cart.payload.val();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
