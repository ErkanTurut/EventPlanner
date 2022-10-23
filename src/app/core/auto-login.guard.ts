import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable, pipe } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  AuthPipe,
  isNotAnonymous,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  emailVerified,
} from '@angular/fire/auth-guard';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: Auth
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      return true;
    }
  }
}
