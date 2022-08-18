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

  error?: string
  token: any

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
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
    this.apiService.login(this.loginForm.value as Account).subscribe({
      next: (next: any) => {
        this.token = next.token
        console.log(this.token);
      },
      error: error => this.error = error.message,
    })
  }

  checkValueError(value: string) {
    return this.loginForm.get(value)?.invalid && 
    (this.loginForm.get(value)?.dirty || this.loginForm.get(value)?.touched)
  }

  validate(value: string, rule: string) {
    return this.loginForm.get(value)?.errors?.[rule]
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
