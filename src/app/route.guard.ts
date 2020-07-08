import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(state)
    // TODO: Replace this with auth verification logic
    switch (state.url) {
      case '/view-report':
      case '/checker-dashboard':
      case '/dashboard':
      case '/viewer-dashboard':
        return true;
      default:
        return false;
    }
  }

}
