import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })

  export class NotificationService {

    url = 'https://localhost:8000'

    constructor(
      private _http: HttpClient, 
      private _authService: AuthenticationService){}
    
    getMessageNotifications(){
      const url = this.url + '/notifications';
      const headers = this._authService.getHeaders();
      return  this._http.get<any>(url, { headers }).pipe();
    }

    getConnectionNotifications(){
        const url = this.url + '/con_notifications';
        const headers = this._authService.getHeaders();
        return  this._http.get<any>(url, { headers }).pipe();
    }

    getPostNotifications(){
        const url = this.url + '/post_notifications';
        const headers = this._authService.getHeaders();
        return  this._http.get<any>(url, { headers }).pipe();
    }


  }
