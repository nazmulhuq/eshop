import { Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    router: Router,
    private userService: UserService
  ) {}

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.appUser$.pipe(
      map((appUser) => {
        return appUser.isAdmin === "true" ? true : false;
      })
    );
  }
}
