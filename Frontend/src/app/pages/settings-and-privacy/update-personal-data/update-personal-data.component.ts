import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-update-personal-data',
  templateUrl: './update-personal-data.component.html',
  styleUrls: ['./update-personal-data.component.css']
})
export class UpdatePersonalDataComponent implements OnInit {


  userId: any;
  profileData: any;
  isGenderMale: boolean = true;

  constructor(   
    private profileService: ProfileService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          /*
          this.profileData.skills = this.profileData.skills.split(',')
          this.profileData.interests = this.profileData.interests.split(',')
          this.profileData.work = this.profileData.work.split(',')
          this.profileData.education = this.profileData.education.split(',')
          */
          if(this.profileData.gender === 'male')
            this.isGenderMale = true;
          else
            this.isGenderMale = false;
            console.log("Gender ", this.isGenderMale)
      }
      )
  }


  updatePersonalData(){


    if(this.isGenderMale = true) {
    this.profileData.gender = 'male';
    }
    else {
      this.profileData.gender = 'female';
    }
    console.log(this.profileData.isPrivateProfile)

    console.log(this.profileData)
    this.profileService.updatePersonalData(this.profileData).subscribe(
      response => {
          console.log("Response - ",response)


      }
      )
      //this.route.navigate(['profile/',this.userId])
    //  window.location.href = "/settings-and-privacy";

  }


  //Redirections:
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}
}
