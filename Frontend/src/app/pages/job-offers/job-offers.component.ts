import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { JobService } from 'src/app/services/job.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {

  constructor(  
    private _authenticationService: AuthenticationService, 
    private _profileService: ProfileService,
    private _connectionService: ConnectionService,
    private _notificationService: NotificationService,
    private _postService: PostService,
    private _messageService: MessageService,
    private _jobService: JobService,) { }

  jobs: any[] = [];
  searchText: string = "";


  ngOnInit(): void {
  
  }
  searchJobOfferByCompany(){
    this._jobService.getAllJobOffers().subscribe(
      response => {
        this.jobs=[]
        console.log("Response JobOffers - ",response)
        var nonFilteredJobs = response.jobOffers

        for(let i = 0; i < nonFilteredJobs.length; i++){
          if(nonFilteredJobs[i].company.toLowerCase().includes(this.searchText.toLowerCase())){
            this.jobs.push(nonFilteredJobs[i])
          }
        }
        console.log("Response JobOffers - ",this.jobs)
      }
    )
  }


}
