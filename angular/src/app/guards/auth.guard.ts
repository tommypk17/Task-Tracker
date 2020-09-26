import { Injectable } from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(): boolean {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/profile/login']);
      return false;
    }
    return true;
  }

  canLoad(): boolean {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/profile/login']);
      return false;
    }
    return true;
  }
  
}
