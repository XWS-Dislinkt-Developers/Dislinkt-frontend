import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserPost } from 'src/app/models/userPost.model';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { ProfileService } from 'src/app/services/profile.service';

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

constructor(
  private _authenticationServiceService: AuthenticationServiceService, 
  private _profileService: ProfileService,
  private http: HttpClient) { }

  userPosts!: UserPost[];
  users: any[] = [];
  LoggedUser: Boolean = false;
  
  ngOnInit(): void { 
    this.admin = this._authenticationServiceService.adminAccess()
    console.log(this.admin)
    this.user = this._authenticationServiceService.userAccess()
    console.log(this.user)
  }

  getUserPosts(): Observable<UserPost[]> {
    return this.http.get<UserPost[]>('https://localhost:8000/userPosts');
  }

  logIn() {
    this._authenticationServiceService.logIn(this.username, this.password).subscribe(
      response => {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userRole", response.role);
    });
  }

  searchUsersByUsername(){
    if (localStorage.getItem("userToken") == null){
      this._profileService.searchAnonymous(this.searchText).subscribe(
      response => {
        console.log("Response ANONYMOUS - ",response)
        this.users = response.users
        this.numberOfSearchResults = this.users.length
      })
    } else {
      this.LoggedUser = true
      this._profileService.searchLoggedUser(this.searchText).subscribe(
      response => {
        console.log("Response LOGGED USER- ",response)
        this.users = response.Users
        console.log("Response - ", this.users)
        this.numberOfSearchResults = this.users.length
      })
    }
  }


  //Redirections:
  redirectToUserProfile(id: number) { window.location.href = "/profile/"+ id;  };


}
