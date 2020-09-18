import { ProductService } from "./../../product.service";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAllProducts()
      .subscribe((products) => {
        this.products = this.filteredProducts = products;
        //console.log(this.filteredProducts);
      });
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.filteredProducts.filter((p) =>
          p.value.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnInit() {}
}
