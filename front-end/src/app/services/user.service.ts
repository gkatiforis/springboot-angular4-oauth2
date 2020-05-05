import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions,Response} from '@angular/http';
import {User} from "../model/model.user";
import 'rxjs/add/operator/map';
import {AppComponent} from "../app.component";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Cookie} from "ng2-cookies";
@Injectable()
export class UserService {
  currentUser:User;
  constructor(public http: Http) {}


  public getUser( user: User) {

    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+ Cookie.get('access_token')});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(AppComponent.API_URL+'/user/' + user.id ,   options)
      .map(data => {
        if(data.status == 200)
             return data;
        else return null;
    });
  }

  public logIn(user: User){

    let params = new URLSearchParams();
    params.append('username',user.username);
    params.append('password', user.password);
    params.append('grant_type','password');
    params.append('client_id','client');
    let headers = new Headers({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("client:secret")});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(AppComponent.API_URL + '/oauth/token', params.toString(), options)
      .map(data => {

        return data;
      });
  }


  createAccount(user:User){
    return this.http.post(AppComponent.API_URL+'/user/register',user)
      .map(resp=>resp.json());
  }
}
