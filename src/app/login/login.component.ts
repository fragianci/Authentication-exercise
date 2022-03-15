import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorDiv = false;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: this.formBuilder.control('', Validators.required)
    })

  }

  login(formValue: any){
    this.http.get('assets/mocks/users.json', { responseType: 'text' }).subscribe(
      res => {
        JSON.parse(res).forEach((user: any) => {
          if(user.email === formValue.email && user.password === formValue.password) this.router.navigate(['/account', {user: user.username}])
          else this.errorDiv = true;
        });
      },
      error =>{
        console.log(error)
      }
    )
  }

}
