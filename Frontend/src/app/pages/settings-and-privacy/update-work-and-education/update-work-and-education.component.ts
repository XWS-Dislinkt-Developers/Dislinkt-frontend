import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-work-and-education',
  templateUrl: './update-work-and-education.component.html',
  styleUrls: ['./update-work-and-education.component.css']
})
export class UpdateWorkAndEducationComponent implements OnInit {

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

    updateWorkAndEducation(){
      this.profileService.updateWorkAndEducation(this.profileData).subscribe(
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
              text: this.profileData.username + ', your work and education are successfully updated!',
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
}
