import { Product } from "./../../models/product";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryService } from "src/app/category.service";
import { ProductService } from "src/app/product.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {
    key: null,
    value: { title: null, price: null, category: null, imageUrl: null },
  };
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = this.categoryService.getCategories();

    this.id = route.snapshot.paramMap.get("id");
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.product = p;
        });
    }
  }

  ngOnInit() {}

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this item?")) return;
    this.productService.delete(this.id);

    this.router.navigate(["/admin/products"]);
  }
}
