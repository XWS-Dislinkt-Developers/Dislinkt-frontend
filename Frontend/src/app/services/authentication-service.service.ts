import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogInInfo } from '../models/auth/ILogInInfo';
import { IResponse } from '../models/auth/IResponse';
import { IUserInfo } from '../models/auth/IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  checkUsername(value: any) {
    console.log("PROVERAVAM USERNAME ")
    console.log(value)
    return this._http.post<IUserInfo>('http://localhost:8000/user', {"username": value})
  
  }

  constructor(private _http: HttpClient) { }

  logIn(username: string, password: string) : Observable<ILogInInfo> {
    var body = {"username": username, "password": password}
    return this._http.post<ILogInInfo>('http://localhost:8000/login', body).pipe();
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
 
}
