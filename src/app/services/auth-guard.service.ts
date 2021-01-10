import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  private isLoggedIn: boolean;
  constructor(private router: Router) { }

  canActivate(){
    this.resolveObs();

    if(!this.isLoggedIn){
      this.router.navigate(['/'])
    }
    return this.isLoggedIn;
  }
  resolveObs(){
      this.isLoggedIn = localStorage.getItem('id')? true: false;
      console.log(`The user is logged in: ${this.isLoggedIn}`)
  }
}
