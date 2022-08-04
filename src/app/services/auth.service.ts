import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  // loginSubject = new Subject<User>();
  // @Output() loginEmitter = new EventEmitter<User>();
  isUserLogged = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) {  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe((params) => {
      console.log(params)
    })

  }

  isUserLoggedIn(){
    this.isUserLogged = !!localStorage.getItem('token')
    return this.isUserLogged;
  }

  login(user: User){
    localStorage.setItem('token', user.username)
    this.router.navigate(['account'], {queryParams: {user: user.username}});
    return true;
  }

  logout(){
    localStorage.removeItem('token');
    this.isUserLogged = false;
  }
}
