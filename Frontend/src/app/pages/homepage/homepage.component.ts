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

admin: boolean=false;
user: boolean=false;
username: string = "";
password: string = "";
isSearchForUsers: boolean = true;
searchText: string = "";
numberOfSearchResults: number =0;

userPosts!: UserPost[];
users: any[] = [];
isSomebodyLoggedIn: boolean = false;
loggedUserId: any = "";
loggedUserRole: any ="";
loggedUserData: any;
loggedUserProfileData: any;
loggedUserConnection: any;

sortedShownNotifications: any[] = []


constructor(
  private _authenticationService: AuthenticationService, 
  private _profileService: ProfileService,
  private _connectionService: ConnectionService,
  private _notificationService: NotificationService,
  private http: HttpClient) {}

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
    this.getProfileDataById()
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

/*
  getNotifications(){
    this._notificationService.getConnectionNotifications().subscribe(
      response => {
        console.log("Response getConnectionNotifications - ",response)
        this.connectionNotifications = response;
        this._notificationService.getMessageNotifications().subscribe(
          response => {
            console.log("Response getMessageNotifications - ",response)
            this.messageNotifications = response;
            this._notificationService.getPostNotifications().subscribe(
              response => {
                console.log("Response getPostNotifications - ",response)
                this.postNotifications = response;
                console.log("Response ALL NOT - ",this.allNotifications)

              })
          })
      })
  }*/

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


