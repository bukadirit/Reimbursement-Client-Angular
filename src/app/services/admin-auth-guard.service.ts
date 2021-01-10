import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{
  private isAdmin: boolean;
  constructor(private router: Router) { }

  canActivate(){
    this.resolveObs();

    if(!this.isAdmin){
      this.router.navigate(['portal'])
    }
    
    return this.isAdmin;
  }

  resolveObs(){
    this.isAdmin = localStorage.getItem('role') === 'Admin'? true: false;
    console.log(`The user is an administrator: ${this.isAdmin}`);
    
  }
}
