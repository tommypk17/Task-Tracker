import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  user: any;
  success: any;
  data: any;
  message: any;

  constructor(private http: HttpClient, private jwt: JwtHelperService) { }

  registerUser(user): Observable<object>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/register', user, {headers: headers});
  }

  authenticateUser(user): Observable<object>{
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/auth', user, {headers: headers});
  }

  getProfile(): Observable<object>{
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.set('Authorization', this.token);
    headers = headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  //TODO: make an updateProfile(user), update most fields

  loadToken(): void{
    const token = localStorage.getItem('token');
    this.token = token;
  }

  storeUserData(token, user): void{
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.token = token;
    this.user = user;
  }

  retrieveUserData(): object {
    let user = null;
    if (this.loggedIn()){
      user = JSON.parse(localStorage.getItem('user'));
    }
    return user;
  }

  loggedIn(): boolean{
    return !this.jwt.isTokenExpired(this.token);
  }

  logout(): void{
    this.token = null;
    this.user = null;

    localStorage.clear();
  }

}
