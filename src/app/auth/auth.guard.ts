import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const expectedRole = route.data['role']; 
    console.log("role",role);
    console.log("expected",expectedRole);
    if (expectedRole !== undefined && role !== expectedRole) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
  
}
