import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })

  export class JobService {

    url = 'https://localhost:8000'

    constructor(
      private _http: HttpClient, 
      private _authService: AuthenticationService){}
    
    searchJobOfferByCompany(){
      const url = this.url + '/userFeed';
      const headers = this._authService.getHeaders();
      return  this._http.get<any>(url, { headers }).pipe();
    }

    createJobOffer(comment: any){
      const url = this.url + '/comment';
      const body = { "addComment" : comment }
      console.log(body.addComment)
      const headers = this._authService.getHeaders();
      return  this._http.post<any>(url, body.addComment, {headers} ).pipe();
    }
 
    //Admin:
    getAllJobOffers(){ 
      const url = this.url + '/jobOffers';
        const headers = this._authService.getHeaders();
        return  this._http.get<any>(url, {headers} ).pipe();
  }

  }
