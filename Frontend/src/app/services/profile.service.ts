import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';


@Injectable({
    providedIn: 'root'
  })

  export class ProfileService {

    url = 'https://localhost:8000'


    constructor(
        private _http: HttpClient, 
        private authService: AuthenticationServiceService){}
        
    getLoggedUser() {
        const url = this.url + '/getLoggedUser'
        const body = { title: 'Angular POST Request - getLoggedUser'}
        const headers = this.authService.getHeaders();
        return  this._http.post<any>(url, body, { headers });
        }
        
    getUserById(userId: string){
        const url = this.url + '/getUserById/' + userId;
        const body = { title: 'Angular POST Request - getUserById(userId)'}
        const headers = this.authService.getHeaders();
        return  this._http.post<any>(url, body, { headers });
    }

    updatePersonalData(updateUser: any){

        alert('Hello')
        console.log(updateUser);
        const url = this.url + '/updatePersonalData';
        /*
        const body = {  title: 'Angular POST Request - updatePersonalData()',
                        updateUserData: updateUser
            }
            */
        const headers = this.authService.getHeaders();
        return  this._http.post<any>(url, updateUser , { headers }).pipe();
    }


    searchAnonymous(searchText: string){
        return this._http.post<any>('https://localhost:8000/getUsersBySearch', {name : searchText}).pipe();
    }

    searchLoggedUser(searchText: string){
        const headers = this.authService.getHeaders();
        return this._http.get<any>('https://localhost:8000/searchUsersForLoggedUser/' + searchText, { headers}).pipe();
    }

  }



    




  