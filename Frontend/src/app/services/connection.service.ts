import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })

  export class ConnectionService {

    url = 'https://localhost:8000'

    constructor(
        private _http: HttpClient, 
        private _authService: AuthenticationService){}
        
    getConnectionsByUserId(userId: string){
        const url = this.url + '/getConnectionForUser/' + userId;
        const headers = this._authService.getHeaders();
        return  this._http.get<any>(url, { headers }).pipe();
    }

    addFriend(userId: string){
      const url = this.url + '/follow/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    unfriend(userId: string){
      const url = this.url + '/unfollow/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    block(userId: string){
      const url = this.url + '/block/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    unblock(userId: string){
      const url = this.url + '/unblock/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    accept(userId: string){
      const url = this.url + '/accept/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    decline(userId: string){
      const url = this.url + '/decline/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    cancel(userId: string){
      const url = this.url + '/cancel/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

  }
