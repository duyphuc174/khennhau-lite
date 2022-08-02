import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  title = 'Tạo tài khoản'

  submitTable = false
  submitted = false
  susccessSubmit = false

  registerForm = this.fb.group({
    joinCode: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    this.canSubmit()
  }

  select() {
    this.router.navigateByUrl('/login')
  }

  submit() {
    if(this.submitTable) {
      console.log('submitted');
    }
  }

  canSubmit() {
    if(
      this.joinCode?.errors ||
      this.name?.errors ||
      this.email?.errors ||
      this.password?.errors ||
      this.confirmPassword?.errors
    ) {
      this.submitTable = false
    } else {
      this.submitTable = true
    }
  }

  
  checkValueError(value: string) {
    return this.registerForm.get(value)?.invalid && 
    (this.registerForm.get(value)?.dirty || this.registerForm.get(value)?.touched)
  }

  validate(value: string, rule: string) {
    return this.registerForm.get(value)?.errors?.[rule]
  }

  get joinCode() {
    return this.registerForm.get('joinCode')
  }

  get name() {
    return this.registerForm.get('name')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }
}
