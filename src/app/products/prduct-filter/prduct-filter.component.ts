import { CategoryService } from "./../../category.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-filter",
  templateUrl: "./prduct-filter.component.html",
  styleUrls: ["./prduct-filter.component.css"],
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input("category") category = null;
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories();
  }

  ngOnInit() {}
}
