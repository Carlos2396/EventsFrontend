import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint:string;
  private headers: HttpHeaders;

  constructor(private http:HttpClient) { 
    this.endpoint = environment.APIEndpoint;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  // Make the post request with the id and password provided, if successful, sets session data
  login(id:string, password:string) {
    let user;
    let body = {
      user_id: id,
      password: password
    }

    return this.http.post(
      this.endpoint + '/login',
      body,
      { headers: this.headers }
    )
  }

  // Sets session data with the login response
  setSession(res) {
    const expiresAt = moment().add(res.expiration_time, 'second');

    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('expiresAt', JSON.stringify(expiresAt.valueOf()));
  }

  // asks for sesison to be deleted
  logout() {
    let headers = this.headers.set('Authorization', 'Bearer ' + this.getToken());

    return this.http.get(
      this.endpoint + '/logout',
      { headers: headers }
    );
  }

  removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expiresAt');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    return moment(JSON.parse(localStorage.getItem('expiresAt')));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
