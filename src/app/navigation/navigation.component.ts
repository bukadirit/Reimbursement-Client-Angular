import { getErrors, removeUser } from './../helpers/helper.functions';
import { Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private service: AuthService,
              private router: Router,
              private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loginStatus$ = this.service.isLoggesIn;
  }

  loginStatus$ : Observable<boolean>;
  
  doLogout(){
    this.service.logout()
    .subscribe((response) =>{
      if(!response){
        removeUser();
        this.service.loginStatus.next(false);
        this.router.navigate(['/']);
        this.openSnackBar('You Have Successfully Logout!');
      }
    }, (error: Response) =>{
      const errMsg = getErrors(error);
      this.openSnackBar(errMsg);
    })
  }

  openSnackBar(msg:string) {
    this.snackBar.open(msg, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'purple-snackbar',
      
    });
  }
}
