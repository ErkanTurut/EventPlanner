import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['events']);
    }
    if (!this.authService.isLoggedIn) {
      console.log('You are not allowed to view this page');
      this.router.navigate(['']);
      return false;
    }
    if (this.authService.isLoggedIn && !this.authService.isEmailVerified) {
      this.router.navigate(['verify-email']);
      return false;
    }
    return true;
  }
}