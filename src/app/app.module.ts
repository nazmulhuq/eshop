import { environment } from "./../environments/environment";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./login/login.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "./auth.service";
import { AuthGuardService as AuthGuard } from "./auth-guard.service";
import { UserService } from "./user.service";
import { AdminAuthGuardService as AdminAuthGuard } from "./admin-auth-guard.service";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryService } from "./category.service";
import { ProductService } from "./product.service";
import { CustomFormsModule } from "ng2-validation";
import { DataTableModule } from "ng-angular8-datatable";
import { ProductFilterComponent } from "./products/prduct-filter/prduct-filter.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ShoppingCartService } from "./shopping-cart.service";
import { ProductQuantityComponent } from "./product-quantity/product-quantity.component";
import { OrderService } from "./order.service";
import { ShoppingCartSummeryComponent } from "./shopping-cart-summery/shopping-cart-summery.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrdersComponent } from "./orders/orders.component";
import { MyOrderDetailsComponent } from "./my-order-details/my-order-details.component";
import { AdminOrderDetailsComponent } from "./admin/admin-order-details/admin-order-details.component";

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummeryComponent,
    OrderDetailsComponent,
    OrdersComponent,
    MyOrderDetailsComponent,
    AdminOrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      { path: "", component: ProductsComponent },
      // { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "login", component: LoginComponent },

      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "my/order-details/:id",
        component: MyOrderDetailsComponent,
        canActivate: [AuthGuard],
      },

      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },

      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: "admin/order-details/:id",
        component: AdminOrderDetailsComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
    ]),
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
