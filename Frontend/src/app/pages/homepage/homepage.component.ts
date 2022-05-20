import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPost } from 'src/app/models/userPost.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  userPosts!: UserPost[];

  
  ngOnInit(): void { 
    this.getUserPosts().subscribe(userPosts => {
      this.userPosts = userPosts;

    })

  }

  getUserPosts(): Observable<UserPost[]> {
    return this.http.get<UserPost[]>("localhost:8000" + '/' + "userPosts");
  }

}
