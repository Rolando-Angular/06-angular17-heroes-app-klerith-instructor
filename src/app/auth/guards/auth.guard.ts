import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return true;
}

export const canActivateGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          return router.createUrlTree(['/auth/login']);
        }
        return true;
      })
    );
};
