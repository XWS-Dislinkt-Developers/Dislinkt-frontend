import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogInInfo } from '../models/auth/ILogInInfo';
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
    console.log("AJDE SERVIS")
    var body = {"username": username, "password": password}
    console.log(username)
    console.log(password)
    return this._http.post<ILogInInfo>('http://localhost:8000/login', body).pipe();
  }

 
}
