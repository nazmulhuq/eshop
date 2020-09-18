import { AngularFireDatabase, SnapshotAction } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Product } from "./models/product";
import { mapper } from "./helpers/mapper";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAllProducts() {
    return this.db
      .list("/products", (ref) => ref.orderByChild("title"))
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((item) => {
            return mapper.mapToProduct(item);
          });
        })
      );
  }

  getProduct(productId) {
    return this.db
      .object("/products/" + productId)
      .snapshotChanges()
      .pipe(
        map((item) => {
          return mapper.mapToProduct(item);
        })
      );
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
