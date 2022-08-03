import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Register {
  name: string
  email: string
  password: string
  organization_name: string
  join_code: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  url = environment.apiUrl + '/register'

  users: Register[] = []

  getUsers(): Register[] {
    return this.users
  }

  constructor(public http: HttpClient) { }

  ngOnInit(): void {

  }
}
