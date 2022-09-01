import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {  Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ILogInInfo } from '../models/auth/ILogInInfo';
import { IResponse } from '../models/auth/IResponse';
import { IUserInfo } from '../models/auth/IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  checked: any
  data: any;

  constructor(private _http: HttpClient) { 
   
  }

  checkUsername(value: any) {
    console.log(" -- CHECKING username...")
    console.log(value)
    return  this._http.post<any>('https://localhost:8000/user', {"username": value}).pipe()
  }

  logIn(username: string, password: string) : Observable<ILogInInfo> {
    var body = {"username": username, 
                "password": password}
   return   this._http.post<ILogInInfo>('https://localhost:8000/login', body).pipe();  
  }

  sendPasswordRecoveryRequest(email: string): Observable<IResponse> {
    return this._http.post<IResponse>('https://localhost:8000/passwordRecoveryRequest', {"email": email}).pipe();
  }
  
  passwordRecovery(code: string, password: string, confirmPassword: string): Observable<IResponse> {
    return this._http.post<IResponse>('https://localhost:8000/userPasswordRecovery', 
    {
     "code": code,
     "password": password,
     "confirmPassword" : confirmPassword
    }).pipe();
  }

  loggedIn() {
    return !!localStorage.getItem('userToken')
  }

  adminAccess() {
    var lsUser = localStorage.getItem('userRole')
    if (lsUser == "admin"){
      //console.log(" -- CHECKING admin's access: TRUE") 
      return true
    }
    //console.log(" -- CHECKING admin's access: FALSE")
    return false
  }

  userAccess() {
    var lsUser = localStorage.getItem('userRole')
    if (lsUser == "user"){
      console.log(" -- CHECKING user's access: TRUE ")
      return true
    }
    console.log(" -- CHECKING user's access: FALSE ")
    return false
  }
 
 register(person: any){
   console.log(" -- Service for Registration...")
   return this._http.post<IResponse>('https://localhost:8000/register', person).subscribe(
     response => {
     if(response.error !="" && response.error != undefined){
        console.log(response.error)
        Swal.fire({ icon: 'error',
                    title: "Something went wrong. 😒",
                    footer: "Exact error: " + response.error,
      })
     }  
     }
   )
 }

 sendPasswordlessLoginRequest(email: string): Observable<IResponse> {
  return this._http.post<IResponse>("https://localhost:8000/passwordlessLoginRequest",
  {
    "email": email
  }).pipe();
 }

  PasswordlessLoginRequest(code: string) : Observable<ILogInInfo>{
    return this._http.post<ILogInInfo>("https://localhost:8000/passwordlessLogin",
    {
      "code": code
    }).pipe();
  }

  isUserLoggedIn(){
    let username = localStorage.getItem("username");
    let role = localStorage.getItem("userRole");
    if(username == null || username == undefined ){
      return false
    }else{
      if(role == 'user') 
        return true;
      /* // TODO: Kako treba da izgleda profil admina?
      if(role == 'admin')
           return true 
      */ 
      return false;
    }
  }


  getHeaders(){
    if (this.isUserLoggedIn()) {
      const userToken = localStorage.getItem("userToken");
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken, }
      return headers;
    } else {
      const headers = {
        'Content-Type': 'application/json',
      }
      return headers;
    }


  }

}
