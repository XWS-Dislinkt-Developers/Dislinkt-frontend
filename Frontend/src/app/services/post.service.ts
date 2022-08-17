import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';


@Injectable({
    providedIn: 'root'
  })

  export class PostService {

    url = 'https://localhost:8000'

    constructor(
        private _http: HttpClient, 
        private _authService: AuthenticationService){}
        

    getAllPostsForLoggedUser(){
      const url = this.url + '/getPostsForLoggedUser';
      const headers = this._authService.getHeaders();
      return  this._http.get<any>(url, { headers });
    }
    getAllPostsByUserId(userId: string){
      const url = this.url + '/getUserPosts/'+userId;
      const headers = this._authService.getHeaders();
      return  this._http.get<any>(url, { headers });
    }

    sendCommentToUserPost(comment: any){
      const url = this.url + '/comment';
      const body = { "addComment" : comment }
      console.log(body.addComment)
      const headers = this._authService.getHeaders();
      return  this._http.post<any>(url, body.addComment, {headers} ).pipe();
    }
    
    like(idPost: string){
      const url = this.url + '/like/'+idPost;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null, { headers });
    }

    dislike(idPost: string){
      const url = this.url + '/dislike/'+idPost;
      const headers = this._authService.getHeaders();
      return  this._http.put<any>(url, null,  { headers });
    }

    createUserPost(userPost: any){
      const url = this.url + '/userPost';
      const body = { "userPost" : userPost }
      console.log(body.userPost)
      const headers = this._authService.getHeaders();
      return  this._http.post<any>(url, body.userPost, {headers} ).pipe();
    }

  }
