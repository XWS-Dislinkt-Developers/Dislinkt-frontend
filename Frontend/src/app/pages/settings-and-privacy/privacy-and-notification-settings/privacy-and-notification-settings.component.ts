import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserPost } from 'src/app/models/userPost.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-privacy-and-notification-settings',
  templateUrl: './privacy-and-notification-settings.component.html',
  styleUrls: ['./privacy-and-notification-settings.component.css']
})
export class PrivacyAndNotificationSettingsComponent implements OnInit {


  
  constructor(private http: HttpClient) { }
  userPosts!: UserPost[];

  ngOnInit(): void {
    /*this.getUserPosts().subscribe(userPosts => {
      setTimeout(() => {
        this.userPosts = userPosts;
        console.log(this.userPosts);
    }, 100);

  })*/
  }

  getUserPosts(): Observable<UserPost[]> {

    return this.http.get<UserPost[]>('https://localhost:8000/userPosts', {headers: new HttpHeaders().set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTAsIlVzZXJuYW1lIjoibWloYWlsbzQ3IiwiUm9sZSI6InVzZXIiLCJleHAiOjE2NTMyNzg2NDl9.j8zkmiV6iE8MyM3GkpXp0E1yo4wScbBDYwfVHwl-U-4`)} );
  }
    //Redirections:
    redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy";}

getToken() {
  let token = localStorage.getItem('userToken')
  console.log(token)
  if (token == null)
    return "nema ga"
  return token
}
}
