import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate{
  private isAdmin$: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(){
    this.resolveObs();

    if(!this.isAdmin$){
      this.router.navigate(['portal'])
    }
    
    return this.isAdmin$;
  }

  resolveObs(){
    console.log('adminGuard')
    this.auth.isAdmin.subscribe(value =>  {
      this.isAdmin$ = value 
      console.log(value)});
    
  }
}
