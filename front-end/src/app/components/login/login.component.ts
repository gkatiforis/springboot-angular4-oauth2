import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../../model/model.user";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {Cookie} from "ng2-cookies";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User=new User();
  errorMessage:string;
  constructor(private userService :UserService, private router: Router) { }



  ngOnInit() {
  }

  login(){
    this.userService.logIn(this.user)
      .subscribe(data=>{
        this.saveToken(data.json());
        },err=>{
        this.errorMessage=err.json().error_description;
        }
      )
  }

  saveToken(token){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set("access_token", token.access_token, expireDate);
    localStorage.setItem('currentUser', JSON.stringify(token.user));
    this.router.navigate(['/search']);

  }
}
