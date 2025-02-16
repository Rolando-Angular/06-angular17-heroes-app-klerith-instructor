import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const canMatchPublicGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return true;
}

export const canActivatePublicGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication()
    .pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return router.createUrlTree(['/heroes/list']);
        }
        return true;
      })
    );
}
