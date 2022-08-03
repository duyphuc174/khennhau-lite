import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, RegisterRequest } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    join_code: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login')
  }

  submit() {
    console.log(this.registerForm.value);
    this.apiService.register(this.registerForm.value as RegisterRequest).subscribe(console.log)
  }
  
  checkValueError(value: string) {
    return this.registerForm.get(value)?.invalid && 
    (this.registerForm.get(value)?.dirty || this.registerForm.get(value)?.touched)
  }

  validate(value: string, rule: string) {
    return this.registerForm.get(value)?.errors?.[rule]
  }

  checkConfirmPassword() {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value
  }

}
