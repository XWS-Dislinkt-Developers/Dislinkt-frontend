import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {  Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IConfirmCode } from '../models/auth/IConfirmCode';
import { ILogInInfo } from '../models/auth/ILogInInfo';
import { IQRCode } from '../models/auth/IQRCode';
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
  return  this._http.post<any>('https://localhost:8000/user', {"username": value}).pipe()
  }

  logIn(username: string, password: string) : Observable<ILogInInfo> {
    var body = {"username": username, "password": password}
   return   this._http.post<ILogInInfo>('https://localhost:8000/login', body).pipe();
  }

  twoFactorReq(id: string) : Observable<IQRCode> {
    var body = {"id": id}
    return   this._http.post<IQRCode>('http://localhost:8085/registerDislinkt/' + id, body).pipe();
  }

  checkCode(token: string, userId: string) : Observable<IConfirmCode> {
    var body = {"token": token, "userId": userId}
    return   this._http.post<IConfirmCode>('http://localhost:8085/verifyDislinkt', body).pipe();
  }

  sendPasswordRecoveryRequest(email: string): Observable<IResponse> {
    return this._http.post<IResponse>('https://localhost:8000/passwordRecoveryRequest', {"email": email}).pipe();
  }
  
  passwordRecovery(code: string, password: string, confirmPassword: string): Observable<IResponse> {
    return this._http.post<IResponse>('https://localhost:8000/passwordRecovery', 
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
    
 







}
