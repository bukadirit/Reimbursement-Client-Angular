import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { setUser } from '../helpers/helper.functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  username: string;
  password: string;
  user :any;

  constructor(private service:AuthService, private router: Router) { }

  doSubmit(){
    this.service.authenticate(this.username, this.password) 
    .subscribe(response => {
      this.user = response;
      
      if(this.user){
        setUser(this.user)
        this.user.password= "";

        this.router.navigate(['/portal']);
      }
    })

  }
}
