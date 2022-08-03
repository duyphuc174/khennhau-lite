import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../environments/environment'

export interface RegisterRequest {
  name: string
  email: string
  password: string
  organization_name: string
  join_code: string
}

export interface Account {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  login(account: Account): Observable<any> {
    return this.http.post(this.post('/token'), account)
  }

  register(post: RegisterRequest): Observable<any> {
    return this.http.post(this.post('/register'), post)
  }

  post(path: string) {
    return env.apiUrl + path
  }

}
