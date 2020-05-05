import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../model/model.user";
import {Router} from "@angular/router";
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'app-profile',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  errorMsg: String;
  currentUser: User;
  user:User;

  constructor(public userService: UserService, public router: Router) {
    this.errorMsg = "";
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user=new User();
  }

  ngOnInit() {
  }

  findUser() {

    this.userService.getUser(this.user).subscribe(
      data => {

        this.errorMsg ='';
       this.user = data.json();
      },
  error => {
    this.errorMsg = error.json().message;
    this.user=new User();
  });

  }

  logOut() {
    Cookie.delete("access_token");
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }
}
