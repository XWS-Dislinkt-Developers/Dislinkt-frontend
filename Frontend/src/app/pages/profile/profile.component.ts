import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogInInfo } from 'src/app/models/auth/ILogInInfo';
import { ProfileData } from 'src/app/models/profileData.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: boolean=false;
  admin: boolean=false;
  username: any

  profileData: ProfileData = new ProfileData()




  constructor(private _http: HttpClient) { }





  ngOnInit(): void {
    this.isUserLoggedIn()
    this.getUserById()
  }

  getUserById() {

    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("userToken")
    })
    //return this.http.get(apiUrl, { headers: headers })



    //console.log(" -- CHECKING username...")
    //console.log(value)
    return  this._http.post<any>('https://localhost:8000/getUserById',  { headers: headers }).subscribe(
      response => {
         console.log(response)
      }
    )
  }











  isUserLoggedIn(){
    this.username = localStorage.getItem("username");
    if(localStorage.getItem("userRole") =='user'){
      this.user =true;
    }if(localStorage.getItem("userRole") =='admin'){
      this.admin = true;
    }
  }

}
