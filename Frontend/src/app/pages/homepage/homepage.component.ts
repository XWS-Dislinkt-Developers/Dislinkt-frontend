import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserPost } from 'src/app/models/userPost.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ConnectionService } from 'src/app/services/connection.service';


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

constructor(
  private _authenticationService: AuthenticationService, 
  private _profileService: ProfileService,
  private _connectionService: ConnectionService,
  private http: HttpClient) { }

  ngOnInit(): void { 
    this.initialize()
    this.admin = this._authenticationService.adminAccess()
    console.log(this.admin)
    this.user = this._authenticationService.userAccess()
    console.log(this.user)
  }

  getUserPosts(): Observable<UserPost[]> {
    return this.http.get<UserPost[]>('https://localhost:8000/userPosts');
  }

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
  }else{
    this.isSomebodyLoggedIn = false;
    this.loggedUserId = ""
    this.loggedUserRole = ""
    }
    this.getLoggedUserDataById()
  }
  //  Get logged user's data
  getLoggedUserDataById(){
    this._profileService.getUserById(this.loggedUserId).subscribe(
      response => {
          console.log("Response - ",response)
          this.getProfileDataById()
      }
    )
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


  searchUsersByUsername(){
    if (!localStorage.getItem("userToken")){
      this._profileService.searchAnonymous(this.searchText).subscribe(
      response => {
        console.log("Response ANONYMOUS - ",response)
        this.users = response.users
        this.numberOfSearchResults = this.users.length
      })
    } else {
      this.isSomebodyLoggedIn = true
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


