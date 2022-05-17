import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogInInfo } from '../models/auth/ILogInInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private _http: HttpClient) { }

  logIn(username: string, password: string) : Observable<ILogInInfo> {
    return this._http.post<ILogInInfo>('http://localhost:8000/login', {"username": "aaa", "password": "aaa"});
  }

}
