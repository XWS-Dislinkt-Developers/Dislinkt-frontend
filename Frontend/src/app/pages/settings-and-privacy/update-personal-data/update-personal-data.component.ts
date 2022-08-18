import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-personal-data',
  templateUrl: './update-personal-data.component.html',
  styleUrls: ['./update-personal-data.component.css']
})
export class UpdatePersonalDataComponent implements OnInit {


  userId!: any;
  profileData: any;
  isGenderMale!: boolean;
  isPrivateProfile!: boolean;

  constructor(   
    private profileService: ProfileService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user

          if(this.profileData.gender === 'male')
            this.isGenderMale = true;
          else
            this.isGenderMale = false;

          if(this.profileData.isPrivateProfile === 'true')
            this.isPrivateProfile = true;
          else
            this.isPrivateProfile = false;
      }
      )
  }

  updatePersonalData(){

    if(this.isGenderMale == true) {
      this.profileData.gender = 'male';
    }
    else {
      this.profileData.gender = 'female';
    }

    if(this.isPrivateProfile == true) {
      this.profileData.isPrivateProfile = true;
      }
    else {
        this.profileData.isPrivateProfile = false;
      }

    this.profileService.updatePersonalData(this.profileData).subscribe(
      response => {
        if(response.error !="" && response.error != undefined){
           console.log(response.error)
           Swal.fire({ icon: 'error',
                       title: "Something went wrong. 😒",
                       background: '#1e2126',
                       color: '#c4c4c4',
                       footer: "Exact error: " + response.error,
         })}
        else{
          Swal.fire({ 
            icon: 'success', 
            title: 'Yippee! 🐶',
            text: this.profileData.username + ', your personal data are successfully updated!',
            showCancelButton: false,
            showConfirmButton: true,
            background: '#1e2126',
            color: '#c4c4c4',
            footer: 'You will be redirected to your profile.'
        }).then(() => {
          window.location.href =  "/profile/" + this.userId;
        })
        }  
        }
      )

  }

  //Redirections:
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}
}
