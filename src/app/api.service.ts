import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment as env } from '../environments/environment'

export interface RegisterRequest {
  "name": string
  "email": string
  "password": string
  "organization_name": string
  "join_code": string
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

  login(account: Account) {
    return this.http.post(this.post('/token'), account)
      .pipe(
        catchError(this.handleError)
      )

  }

  register(post: RegisterRequest) {
    return this.http.post(this.post('/register'), post)
      .pipe(
        catchError(this.handleError)  
      )
  }

  post(path: string) {
    return env.apiUrl + path
  }

  handleError(error: HttpErrorResponse) {
    console.error(error)
    return throwError(() => new Error(error.error.message))
  }

}
