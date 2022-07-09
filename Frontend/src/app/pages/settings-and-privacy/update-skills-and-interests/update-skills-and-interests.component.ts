import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-skills-and-interests',
  templateUrl: './update-skills-and-interests.component.html',
  styleUrls: ['./update-skills-and-interests.component.css']
})
export class UpdateSkillsAndInterestsComponent implements OnInit {


  userId!: any;
  profileData: any;

  constructor(   
    private profileService: ProfileService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
      }
      )
  }


  //Redirections:
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}


  updateSkillsAndInterests(){

    this.profileService.updateSkillsAndInterests(this.profileData).subscribe(
      response => {
        if(response.error !="" && response.error != undefined){
           console.log(response.error)
           Swal.fire({ icon: 'error',
                       title: "Something went wrong. 😒",
                       footer: "Exact error: " + response.error,
         })}
        else{
          Swal.fire({ 
            icon: 'success', 
            title: 'Yippee! 🐶',
            text: this.profileData.username + ', your skills and interests are successfully updated!',
            showCancelButton: false,
            showConfirmButton: true,
            footer: 'You will be redirected to your profile.'
        }).then(() => {
          window.location.href =  "/profile/" + this.userId;
        })
        }  
        }
      )

  }
}
