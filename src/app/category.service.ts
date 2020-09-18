import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list("/categories", (ref) => ref.orderByChild("name"))
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((item) => ({
            key: item.payload.key,
            value: item.payload.val(),
          }));
        })
      );
  }
}
