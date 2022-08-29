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
    
    /*
    searchJobOfferByCompany(companyName : string){
      const url = this.url + '/getOffer';
      const headers = {company: companyName}
      return  this._http.get<any>(url, { headers }).pipe();
    }
    */

    createJobOffer(proposal: any){
      const url = this.url + '/postJob';
      const body = { "proposal" : proposal }
      console.log(body.proposal)
      const headers = this._authService.getHeaders();
      return  this._http.post<any>(url, body.proposal, {headers} ).pipe();
    }
 
    //Admin:
    getAllJobOffers(){ 
      const url = this.url + '/jobOffers';
        const headers = this._authService.getHeaders();
        return  this._http.get<any>(url, {headers} ).pipe();
  }

  }
