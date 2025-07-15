import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const expectedRole = route.data['role']; 
    console.log("role",role);
    console.log("expected",expectedRole);
    console.log("le token",token);

   
    // ✅ Cas 2 : restriction supplémentaire pour certaines routes (formulaire-franchise ou formulaire-iot) et si le rôle est client
    const url = state.url;
    if ((url.includes('formulairefranchise') || url.includes('formulaireiotit'))
       &&(!token|| role === 'Administrateur')
      ) {
      Swal.fire({
        icon: 'error',
        title: 'Authentification requise',
        text: 'Vous devez être connecté pour accéder à cette page.',
        confirmButtonText: 'Se connecter'
      }).then(() => {
        localStorage.setItem('redirectAfterLogin', state.url);
        console.log("liennn",localStorage.getItem('redirectAfterLogin'));
       this.router.navigate(['/auth']);
      });
      return false;
    }
    // ✅ Cas 1 : pas de token -> redirige vers auth
    /*if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentification requise',
        text: 'Vous devez être connecté pour accéder à cette page.',
        confirmButtonText: 'Se connecter'
      }).then(() => {
        this.router.navigate(['/auth']);
      });
      return false;
    }*/

    // ✅ Cas 3 : rôle attendu dans les data (optionnel)
    if (expectedRole !== undefined && role !== expectedRole) {
      Swal.fire({
        icon: 'error',
        title: 'Accès refusé',
        text: 'Vous devez être connecté pour accéder à cette page..',
        confirmButtonText: 'Se connecter'
      }).then(() => {
        event.preventDefault();
        this.router.navigate(['/auth']);
      });
      return false;
    }

    // ✅ Sinon, tout est bon
    return true;
  
  }
  
}
