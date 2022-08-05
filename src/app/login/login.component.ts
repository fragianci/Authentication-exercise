import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorDiv = false;
  users = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: this.formBuilder.control('', Validators.required)
    })

  }

  login(loginFormValue: any){
    this.http.get('assets/mocks/users.json', { responseType: 'text' }).subscribe(
      res => {
        JSON.parse(res).forEach((user: any) => {
          if(user.email === loginFormValue.email && user.password === loginFormValue.password) {
            this.errorDiv = false;
            const newUser = new User(user.username, user.email, user.password)
            this.loginService.login(newUser)
            // return true;
          }
          else {
            this.errorDiv = true;
            // return false;
          }
        });
      },
      error =>{
        console.log('Oops, has occurred an error', error)
      }
    )
  }

}
