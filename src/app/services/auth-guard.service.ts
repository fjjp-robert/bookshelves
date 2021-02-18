import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router:Router) { }

  canActivate(): boolean | Observable<boolean> | Promise<boolean > {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            }
            else {
              this.router.navigate(['/auth', 'sign-in']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
