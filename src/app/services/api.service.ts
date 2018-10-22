import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class APIService {
  endpoint:string;
  headers: HttpHeaders;

  models = {
    ANSWER: "answers",
    EVENT: "events",
    EXTRA: "extras"
  }

  constructor(private http:HttpClient, private auth:AuthService) { 
    this.endpoint = environment.APIEndpoint;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    if(this.auth.isLoggedIn()) {
      this.headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    }
  }

  /**
   * CRUD Requests
   */
  list(model: string) {
    return this.http.get(
      this.endpoint + '/' + model,
      { headers: this.headers }
    );
  }

  retrieve(model:string, id:any) {
    return this.http.get(
      this.endpoint + '/' + model + '/' + id,
      { headers: this.headers }
    )
  }

  create(model:string, body:any) {
    return this.http.post(
      this.endpoint + '/' + model,
      body,
      { headers: this.headers }
    );
  }

  update(model:string, id:any, body:any) {
    return this.http.put(
      this.endpoint + '/' + model + '/' + id,
      body,
      { headers: this.headers }
    )
  }

  delete(model:string, id:any) {
    return this.http.delete(
      this.endpoint + '/' + model + '/' + id,
      { headers: this.headers }
    )
  }

  /**
   * Requests to modify logged account
   */
  register(body:any) {
    return this.http.post(
      this.endpoint + '/users',
      body,
      { headers: this.headers }
    );
  }
  
  getLogged() {
    this.http.get(
      this.endpoint + '/user',
      { headers: this.headers }
    )
  }

  updateAccount() {
    this.http.put(
      this.endpoint + '/user',
      { headers: this.headers }
    )
  }

  deleteAccount() {
    this.http.delete(
      this.endpoint + '/user',
      { headers: this.headers }
    )
  }

  changePassword(body:any) {
    return this.http.post(
      this.endpoint + 'user/changePassword',
      body,
      { headers: this.headers }
    )
  }
}
