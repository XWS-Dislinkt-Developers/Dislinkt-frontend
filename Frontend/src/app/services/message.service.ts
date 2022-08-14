import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })

  export class MessageService {

    url = 'https://localhost:8000'

    constructor(
        private _http: HttpClient, 
        private _authService: AuthenticationService){}
        

    getAllUsersMessagesByUserId(userId: string){
      const url = this.url + '/messages/' + userId;
      const headers = this._authService.getHeaders();
      return  this._http.get<any>(url, { headers });
    }

    sendMessage(userMessage: any){
        const url = this.url + '/sendMessage'
    
        const body = { "message" : userMessage }
        
              
      
        console.log("userMessage", userMessage)
        console.log("body", body )
        console.log("message", body.message)

        const headers = this._authService.getHeaders();
        return  this._http.post<any>(url, body.message).pipe();


    }

  }
