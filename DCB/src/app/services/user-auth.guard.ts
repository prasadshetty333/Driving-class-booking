// admin-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/user-login']);
      return false;
    }
  }
}
