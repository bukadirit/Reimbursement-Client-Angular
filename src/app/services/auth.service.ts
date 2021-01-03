import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public adminStatus = new BehaviorSubject<boolean>(this.checkIsAdmin());
  private url ='http://localhost:8080/ers/auth/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  authenticate(u: string, p: string){
    return this.http.post(this.url + "login", {username: u ,password: p}, this.httpOptions);
  }

  logout(){
    return this.http.post(this.url + "logout", null, this.httpOptions);
  }

  checkLoginStatus() : boolean {
    if(localStorage.getItem('id') === null || localStorage.getItem('id') === undefined){
      return false;
    }
    return true;
  }

  checkIsAdmin() : boolean{
    if(localStorage.getItem('role') != 'Admin'){
      console.log(localStorage.getItem('role'))
      return false;
    }
    console.log(localStorage.getItem('role'))
    return true;
  }

  get isAdmin(){
    return this.adminStatus.asObservable();
  }

  get isLoggesIn() {
      return this.loginStatus.asObservable();
    }
}
