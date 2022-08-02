import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginService, Register } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name = 'khennhau.com'

  submitTable = false
  submitted = false
  susccessSubmit = false

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]]
  })

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.showData()
    console.log(this.datas);
    
  }

  datas: Register[] = []

  showData() {
    this.loginService.getData().subscribe(data => this.datas = data)
  }

  ngDoCheck(): void {
    this.canSubmit()
  }

  submit() {
    if(this.submitTable) {
      console.log('submitted');
      
    }
  }

  canSubmit() {
    if(this.username?.errors || this.password?.errors) {
      this.submitTable = false
    } else {
      this.submitTable = true
    }
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
