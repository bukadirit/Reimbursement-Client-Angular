import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url ='http://localhost:8080/ers/auth/login';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  authenticate(u: string, p: string){
    return this.http.post(this.url, 
                  {username: u ,password: p}, 
                  this.httpOptions          
    )
  }
}
