import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import {User} from '../model/user.model';
import {HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  User: User={
    "username": "",
    "firstName": "",
    "lastName": "",
    "emailId": "",
    "dateOfBirth": "",
    "mobileNo": 0,
    "password":""
  };

  constructor(private http:HttpClient) { }
  
  register(user:User){
    console.log(user);
    return this.http.post(environment.apiBaseUrl+'/public/signup',user).pipe(catchError(this.handleError))
  }

  
  login(username: string, password: string){
   
    console.log(username, password);
    return this.http.post(environment.apiBaseUrl+'/public/signin',{username, password},httpOptions).pipe(catchError(this.handleError))
  }

  getId(){
    let user= this.getUsername() || '';
    return this.http.get(environment.apiBaseUrl+'/getId/'+user);
  }

  getAccessToken(){
    return localStorage.getItem('access_token');
  }

  get isAdmin():boolean{
    if (localStorage.getItem('role')=='ROLE_ADMIN')
      return true;
    else
      return false;
  }

  getUsername(){
    return localStorage.getItem('username');
  }


  get isLoggedIn():boolean{
    let authToken=localStorage.getItem('access_token');
    return (authToken!==null)? true:false;
  }

  logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  }

  handleError(error:HttpErrorResponse){
    let msg='';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
      }
  }
  


