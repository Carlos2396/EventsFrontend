import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedService {

  private endpoint:string;
  private headers: HttpHeaders;

  constructor(private http:HttpClient, private auth:AuthService) { 
    this.endpoint = environment.APIEndpoint;
    this.refreshHeaders();
  }

  refreshHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });
  }
  
  getLogged() {
    this.refreshHeaders();
    return this.http.get(
      this.endpoint + '/user',
      { headers: this.headers }
    )
  }

  updateAccount() {
    this.refreshHeaders();
    return this.http.put(
      this.endpoint + '/user',
      { headers: this.headers }
    )
  }

  deleteAccount() {
    this.refreshHeaders();
    return this.http.delete(
      this.endpoint + '/user',
      { headers: this.headers }
    )
  }

  changePassword(body:any) {
    this.refreshHeaders();
    return this.http.post(
      this.endpoint + 'user/changePassword',
      body,
      { headers: this.headers }
    )
  }
}
