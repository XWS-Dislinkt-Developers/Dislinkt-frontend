import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })

  export class PostService {

    url = 'https://localhost:8000'

    constructor(
        private _http: HttpClient, 
        private _authService: AuthenticationService){}
        

    getAllPostsForLoggedUser(){
      const url = this.url + '/getPostsForLoggedUser';
      const headers = this._authService.getHeaders();
      return  this._http.get<any>(url, { headers });
    }


  }
