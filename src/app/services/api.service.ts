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
    this.refreshHeaders();
  }

  refreshHeaders() {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.auth.getToken()
    });
  }

  /**
   * CRUD Requests
   */
  list(model: string) {
    this.refreshHeaders();
    return this.http.get(
      this.endpoint + '/' + model,
      { headers: this.headers }
    );
  }

  retrieve(model:string, id:any) {
    this.refreshHeaders();
    return this.http.get(
      this.endpoint + '/' + model + '/' + id,
      { headers: this.headers }
    )
  }

  create(model:string, body:any) {
    this.refreshHeaders();
    return this.http.post(
      this.endpoint + '/' + model,
      body,
      { headers: this.headers }
    );
  }

  update(model:string, id:any, body:any) {
    this.refreshHeaders();
    return this.http.put(
      this.endpoint + '/' + model + '/' + id,
      body,
      { headers: this.headers }
    )
  }

  delete(model:string, id:any) {
    this.refreshHeaders();
    return this.http.delete(
      this.endpoint + '/' + model + '/' + id,
      { headers: this.headers }
    )
  }

  register(body:any) {
    return this.http.post(
      this.endpoint + '/users',
      body,
      { headers: this.headers }
    );
  }

  //Other functions
  filterAnswers(extra_id:any, user_id:any){
    return this.http.get(
      this.endpoint + '/extras/' + extra_id + '/' + user_id,
      { headers: this.headers }
    );
  }
}
