import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private url ='http://localhost:8080/ers/auth/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  authenticate(u: string, p: string){
    return this.http.post(this.url, {username: u ,password: p}, this.httpOptions);
  }

  checkLoginStatus() : boolean {
    if(localStorage.getItem('id') === null || localStorage.getItem('if') === undefined){
      return false;
    }
    return true;
  }

  get isLoggesIn() {
      return this.loginStatus.asObservable();
    }
}
