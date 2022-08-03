import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account, ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = 'khennhau.com'

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
  })

  accounts: Account[] = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register')
  }

  submit() {
      console.log(this.loginForm.value);
      this.apiService.login(this.loginForm.value as Account).subscribe(console.log)
  }

  checkValueError(value: string) {
    return this.loginForm.get(value)?.invalid && 
    (this.loginForm.get(value)?.dirty || this.loginForm.get(value)?.touched)
  }

  validate(value: string, rule: string) {
    return this.loginForm.get(value)?.errors?.[rule]
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
