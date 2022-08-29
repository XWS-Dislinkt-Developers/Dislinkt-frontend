import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPost } from 'src/app/models/userPost.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { NotifierService } from 'angular-notifier';
import Swal from 'sweetalert2';
import { NotificationService } from 'src/app/services/notification.service';
import { PostService } from 'src/app/services/post.service';
import { MessageService } from 'src/app/services/message.service';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { JobService } from 'src/app/services/job.service';


interface UserSearchResult{
  userId: string;
  username: string;
  name: string;
  biography: string;
  gender: string;
  isPrivateProfile: string;
}



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


admin: boolean=false;
user: boolean=false;
username: string = "";
password: string = "";
isSearchForUsers: boolean = true;
searchText: string = "";
numberOfSearchResults: number =0;

userPosts!: UserPost[];
users: any[] = [];
jobs: any[] = [];
isSomebodyLoggedIn: boolean = false;
loggedUserId: any = "";
loggedUserRole: any ="";
loggedUserData: any;
loggedUserProfileData: any;
loggedUserConnection: any;

sortedShownNotifications: any[] = []

// admin:
usersForAdmin: any[]=[]
messagesForAdmin: any[]=[]
postsForAdmin: any[]=[]
jobOffersForAdmin: any[]=[]

usersWithPosts: Map<number, any> = new Map();
jobOffers: any[]=[];




constructor(
  private _authenticationService: AuthenticationService, 
  private _profileService: ProfileService,
  private _connectionService: ConnectionService,
  private _notificationService: NotificationService,
  private _postService: PostService,
  private _messageService: MessageService,
  private _jobService: JobService,
  private http: HttpClient) {
  }

  ngOnInit(): void { 
    this.initialize()
  }

  /*
  getUserPosts(): Observable<UserPost[]> {
    return this.http.get<UserPost[]>('https://localhost:8000/userPosts');
  }
*/
  logIn() {
    this._authenticationService.logIn(this.username, this.password).subscribe(
      response => {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userRole", response.role);
    });
  }
  initialize(){
  if(localStorage.getItem("userToken")!=null && localStorage.getItem("userId")!=null && localStorage.getItem("userRole")!=null){
    this.isSomebodyLoggedIn = true;
    this.loggedUserId = localStorage.getItem("userId")
    this.loggedUserRole = localStorage.getItem("userRole")
    if(this.loggedUserRole == 'user')this.getProfileDataById()
    if(this.loggedUserRole == 'admin')this.getAdminData()
  }else{
    this.isSomebodyLoggedIn = false;
    this.loggedUserId = ""
    this.loggedUserRole = ""
    }
  }
  // Get user's profile data
  getProfileDataById(){
    this._profileService.getUserById(this.loggedUserId).subscribe(
      response => {
          console.log("Response - ",response)
          this.loggedUserProfileData = response.user
          if(this.loggedUserConnection){
            this.getConnections()
          }
      }
    )
  }
// Connection methods
    getConnections(){
      this._connectionService.getConnectionsByUserId(this.loggedUserId).subscribe(
        (response: any) => {
          console.log("getConnectionsByUserId - RESPONSE - ",response)
          this.loggedUserConnection = response;
        }
      )
    }

    getAdminData(){
      this._profileService.getAllProfiles().subscribe(
        (response: any) => {
          console.log("usersForAdmin - RESPONSE - ",response)
          this.usersForAdmin = response.users;
          this.usersForAdmin.forEach( (item, index) => {
            if(item.userId == 9) this.usersForAdmin.splice(index,1);
          });

        }
      )
      this._postService.getAllPosts().subscribe(
        (response: any) => {
          console.log("postsForAdmin - RESPONSE - ",response)
          this.postsForAdmin = response.userPosts;
          for(let i=0; i<this.postsForAdmin.length; i++){
            let date = new Date(this.postsForAdmin[i].createdAt).getTime();
            this.postsForAdmin[i].createdAt = this.formatDates(date)
            this._profileService.getUserById(this.postsForAdmin[i].userId).subscribe(
              response => {
                this.usersWithPosts.set(this.postsForAdmin[i].userId, response.user)
              })

          }
        }
      )
      this._messageService.getAllMessages().subscribe(
        (response: any) => {
          console.log("messagesForAdmin - RESPONSE - ",response)
          this.messagesForAdmin = response.messages;
        }
      )
      this._jobService.getAllJobOffers().subscribe(
        (response: any) => {
          console.log("jobsForAdmin - RESPONSE - ",response)
          this.jobOffersForAdmin = response.jobOffers;
        }
      )
    }

  formatDates(date: number) {
      var now = new Date().getTime()
      var seconds = Math.floor((now - date) / 1000);
      var interval = seconds / 31536000;
      if (interval > 1) {
        let num = Math.floor(interval)
        if(num <= 1){
          return num + " year ago"
        }
        return num+ " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        let num = Math.floor(interval)
        if(num <= 1){
          return num+ " month ago"
        }
        return num + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        let num = Math.floor(interval)
        if(num <= 1){
          return num+ " day ago"
        }
        return num + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        let num = Math.floor(interval)
        if(num <= 1){
          return num+ " day ago"
        }
        return num + " days ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        let num = Math.floor(interval)
        if(num <= 1){
          return num+ " minute ago"
        }
        return num + " minutes ago";
      }
      if(seconds >= 1){
      return Math.floor(seconds) + " seconds ago";
      }else{
        return "just now";
      }
  }


  getNotifications(){
    var notifications: any[] = [];
    var shownNotifications: any[] = [];
    this._notificationService.getConnectionNotifications().subscribe(
      response => {
        console.log("Response getConnectionNotifications - ",response)
        notifications = [];
        notifications.push(response.response);
        notifications.forEach(function(value: any){
          shownNotifications.push(value)
        })
        this._notificationService.getMessageNotifications().subscribe(
          response => {
            console.log("Response getMessageNotifications - ",response)
            notifications = [];
            notifications.push(response.response);
            notifications.forEach(function(value: any){
              shownNotifications.push(value)
            })
            this._notificationService.getPostNotifications().subscribe(
              response => {
                console.log("Response getPostNotifications - ",response)
                notifications = [];
                notifications.push(response.response);
                notifications.forEach(function(value: any){
                  shownNotifications.push(value)
                })
                console.log("Response ALL NOT - ",shownNotifications)
                var newArr: any[] = [];
                for(var i = 0; i < shownNotifications.length; i++)
                {
                    newArr = newArr.concat(shownNotifications[i]);
                }
                console.log("Response ALL NOT after merge - ",newArr);
                var beforeSortArr: any[] = [];
                beforeSortArr = newArr.map((obj)=>{
                  return { ...obj, date: new Date(obj.createdAt) };})
                  console.log("Response ALL NOT before sort - ",beforeSortArr);

                var sortArr: any[] = [];
                sortArr = beforeSortArr.sort(
                  (objA, objB) => objB.date.getTime() - objA.date.getTime(),
                );
                console.log("Response ALL NOT afer sort - ",sortArr);
                this.sortedShownNotifications = sortArr
              })
          })
      })
  }
  
  /* NOTIFICATION */
  showNotification(){
    const Toast = Swal.mixin({
      toast: true,
      background: '#1e2126',
      color: '#c4c4c4',
      position: 'bottom-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }

  search(){
    if(this.isSearchForUsers === true) this.searchUsersByUsername()
    else if(this.isSearchForUsers === false) this.searchJobOfferByCompany()

  }

  searchUsersByUsername(){
    if (!this.isSomebodyLoggedIn){
      this._profileService.searchAnonymous(this.searchText).subscribe(
      response => {
        console.log("Response ANONYMOUS - ",response)
        this.users = response.users
        this.numberOfSearchResults = this.users.length
      })
    } else {
      this._profileService.searchLoggedUser(this.searchText).subscribe(
      response => {
        console.log("Response LOGGED USER- ",response)
        this.users = response.Users
        console.log("Response - ", this.users)
        this.numberOfSearchResults = this.users.length
      })
    }
  }

  searchJobOfferByCompany(){
    if(this.isSomebodyLoggedIn){
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
          this.numberOfSearchResults = this.jobs.length
        }
      )

    }
  }

  // Toggles
  togglePanelBody(panelName: string){
    var el = document.getElementById(panelName)
    if (el){
      if (el.classList.contains('hide')) {
        el.classList.remove('hide');
      } else {
        el.classList.add('hide');
      }
    }
  }

  //Redirections:
  redirectToUserProfile(id: number) { window.location.href = "/profile/"+ id;  };



}



