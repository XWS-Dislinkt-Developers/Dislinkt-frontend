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
export class AuthenticationServiceService {
  checked: any
  data: any;

  constructor(private _http: HttpClient) { 
   
  }

  checkUsername(value: any) {
    console.log("PROVERAVAM USERNAME ")
    console.log(value)
  return  this._http.post<any>('http://localhost:8000/user', {"username": value}).pipe()
  }

  logIn(username: string, password: string) : Observable<ILogInInfo> {
    var body = {"username": username, "password": password}
   return   this._http.post<ILogInInfo>('http://localhost:8000/login', body).pipe();
  
    
  }

  sendPasswordRecoveryRequest(email: string): Observable<IResponse> {
    return this._http.post<IResponse>('http://localhost:8000/passwordRecoveryRequest', {"email": email}).pipe();
  }
  
  passwordRecovery(code: string, password: string, confirmPassword: string): Observable<IResponse> {
    return this._http.post<IResponse>('http://localhost:8000/passwordRecovery', 
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
      console.log("PROVERAVAM USER ACCESS ZA ADMINA I TRUE JE ")
     
      return true
    }
    console.log("PROVERAVAM USER ACCESS ZA ADMINA I false JE ")
   
    return false
  }

  userAccess() {
    var lsUser = localStorage.getItem('userRole')
    if (lsUser == "user"){
      console.log("PROVERAVAM USER ACCESS ZA usera I TRUE JE ")
   
      return true
    }
    console.log("PROVERAVAM USER ACCESS ZA usera I false JE ")
    
    return false
  }
 
 register(pearson: any){
   console.log("U SERVISU ZA REG SAM")
   return this._http.post<IResponse>('http://localhost:8000/register', pearson).subscribe(
     response => {
     if(response.error !=""){
        Swal.fire({
        icon: 'error',
        title: "Oooops...",
        text: response.error,
        
      })
     }
     
      
     }
    
   )
 }

 sendPasswordlessLoginRequest(email: string): Observable<IResponse> {
  return this._http.post<IResponse>("http://localhost:8000/passwordlessLoginRequest",
  {
    "email": email
  }).pipe();
 }

  PasswordlessLoginRequest(code: string) : Observable<ILogInInfo>{
    return this._http.post<ILogInInfo>("http://localhost:8000/passwordlessLogin",
    {
      "code": code
    }).pipe();
  }
    
 







}
