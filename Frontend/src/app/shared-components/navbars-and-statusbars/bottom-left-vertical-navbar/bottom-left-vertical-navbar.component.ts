import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { JobService } from 'src/app/services/job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bottom-left-vertical-navbar',
  templateUrl: './bottom-left-vertical-navbar.component.html',
  styleUrls: ['./bottom-left-vertical-navbar.component.css']
})
export class BottomLeftVerticalNavbarComponent implements OnInit {

  constructor(    
    private _authenticationService: AuthenticationService,
    private _jobService: JobService,
    ) {}


  ngOnInit(): void {
  }

  getApiToken(){
    this._jobService.getApiToken().subscribe(
      response => {
        var apiToken = response.token
        console.log(apiToken)
        Swal.fire({
          background: '#1e2126',
          color: '#c4c4c4',
          icon: 'info',
          title: 'Your API token:',
          text: apiToken,
          footer: 'Use it in our external application: Jobby!'
        }
        )
      }
    )
  }



}
