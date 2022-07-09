import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILogInInfo } from 'src/app/models/auth/ILogInInfo';
import { ProfileData } from 'src/app/models/profileData.model';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: boolean=false;
  admin: boolean=false;
  username: any
  userId: any
  myProfile: boolean=false 
  profileData: any

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.myProfile = this.isItMyProfile()
    this.profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          this.profileData.skills = this.profileData.skills.split(',')
          this.profileData.interests = this.profileData.interests.split(',')
          this.profileData.work = this.profileData.work.split(',')
          this.profileData.education = this.profileData.education.split(',')
      }
      
      )
    }

    isItMyProfile():boolean{
      if (this.userId === localStorage.getItem("userId"))
        return true;

      return false

    }



  }
