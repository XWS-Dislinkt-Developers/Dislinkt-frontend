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

  profileData: any

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.isUserLoggedIn()
    if(this.admin || this.user) {
      this.getUserById()
    }
  }

  getUserById() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("userToken")
    }
    const body = { title: 'Angular POST Request - getUserById'}
    //console.log(body.title)
    return  this._http.post<any>('https://localhost:8000/getUserById', body, { headers }).subscribe(
      response => {
         console.log("Response - ",response)
         this.profileData = response.user
         this.profileData.skills = this.profileData.skills.split(',')
         this.profileData.interests = this.profileData.interests.split(',')
         this.profileData.work = this.profileData.work.split(',')
         this.profileData.education = this.profileData.education.split(',')



         console.log("this.profileData.work - ", this.profileData.skills)
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
