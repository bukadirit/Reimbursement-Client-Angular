import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { setUser, validateLogin, getErrors } from '../helpers/helper.functions';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  username: string;
  password: string;
  user :any;

  constructor(private service:AuthService, private router: Router, private snackBar: MatSnackBar) { }

  doSubmit(){
    if(validateLogin(this.username, this.password)){
        this.service.authenticate(this.username, this.password) 
        .subscribe(response => {
          this.user = response;
          
          if(this.user){
            setUser(this.user)
            this.user.password= "";
            this.service.loginStatus.next(true);
    
            this.router.navigate(['/portal']);
          }
        }, 
        (error: Response )=>{
          const errMsg = getErrors(error);
          this.openSnackBar(errMsg);
            this.router.navigate(['/']);
        })
    }else{
        this.openSnackBar('Username and Password are required!');
        this.router.navigate(['/']);
      }
    }
    openSnackBar(msg:string) {
      this.snackBar.open(msg, '', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: 'purple-snackbar',
        
      });
    }
}
