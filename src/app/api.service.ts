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

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  getData(): Observable<RegisterRequest[]> {
    return this.http.get<RegisterRequest[]>(this.post(''))
  }

  login() {
    
  }

  register(post: RegisterRequest): Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(this.post('/register'), post)
  }

  post(path: string) {
    return env.apiUrl + path
  }

}
