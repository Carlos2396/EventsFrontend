import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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
    return this.http.put(
      this.endpoint + '/user/changePassword',
      body,
      { headers: this.headers }
    )
  }

  confirmAccount(uuid:string) {
    return this.http.get(
        this.endpoint + '/confirm/' + uuid,
        { headers: this.headers }
    );
  }

  resendConfirmationEmail(email:string) {
    return this.http.get(
        this.endpoint + '/resend/' + email,
        { headers: this.headers }
    );
  }

  sendPasswordReset(email:string) {
    let body = {
      'email': email
    };

    return this.http.post(
      this.endpoint + '/password/create',
      body,
      { headers: this.headers }
    );
  }

  resetPassword(body) {
    return this.http.post(
        this.endpoint + '/password/reset',
        body,
        { headers: this.headers }
    );
  }
}
