import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPost } from 'src/app/models/userPost.model';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

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
  constructor(private _authenticationServiceService: AuthenticationServiceService, private http: HttpClient) { }

  userPosts!: UserPost[];

  
  ngOnInit(): void { 
    this.getUserPosts().subscribe(userPosts => {
      this.userPosts = userPosts;

    })
    this.admin = this._authenticationServiceService.adminAccess()
    console.log(this.admin)
    this.user = this._authenticationServiceService.userAccess()
    console.log(this.user)
  

  }

  getUserPosts(): Observable<UserPost[]> {
    return this.http.get<UserPost[]>("localhost:8000" + '/' + "userPosts");
  }
  logIn() {
    console.log("AJDE")
    this._authenticationServiceService.logIn(this.username, this.password).subscribe(
      response => {
        localStorage.setItem("userId", response.id);
        localStorage.setItem("userToken", response.token);
        localStorage.setItem("userRole", response.role);
    });
    
   
  }
}
