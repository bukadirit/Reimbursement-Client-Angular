import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  private isLoggedIn$: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(){
    this.resolveObs();

    if(!this.isLoggedIn$){
      this.router.navigate(['/'])
    }
    return this.isLoggedIn$;
  }
  resolveObs(){
    this.auth.loginStatus.subscribe(value => {
      this.isLoggedIn$ = value
      //console.log('authguard')
    });
  }
}
