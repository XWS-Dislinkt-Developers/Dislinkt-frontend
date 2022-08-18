import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILogInInfo } from 'src/app/models/auth/ILogInInfo';
import { ProfileData } from 'src/app/models/profileData.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ConnectionService } from 'src/app/services/connection.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: boolean=false;
  admin: boolean=false;
  username: any
  userId: any
  loggedUserId: any

  // User Data
  profileData: any
  loggedUserData: any

  // Connections data:
  userConnections: {
    private?: boolean;
    connections?: any[];
    requests?: any[];
    waitingResponse?: any[];
    blocked?: any[];
  } = {};


  // UserPosts data:
  userPosts: {
    comments:{
      userId: string;
      createdAt: string;
      text: string;
    }[];
    likes: any [];
    dislikes: any [];

    
    id: string;
    userId: string;
    text: string;
    imagePath: string;

    createdAt: string;
    showComments:boolean;
    showAddComment: boolean;

    isLikedByLoggedUser: boolean;
    isDislikedByLoggedUser: boolean;

    addNewComment: string;
  } [] = [];

  // Image
  createPostText: string = "";
  postImageIsSelected: boolean = false;
  isImageSaved: boolean = false;
  postImageBase64: string = '';

  users: Map<string, any> = new Map();

  constructor(
    private _profileService: ProfileService,
    private _connectionService: ConnectionService,
    private _postService: PostService,
    private route: ActivatedRoute,
    private sanitizer : DomSanitizer
    ) {}


  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.loggedUserId = localStorage.getItem('userId')
    this.getLoggedUserDataById()
    }
  
  //  Get logged user's data
  getLoggedUserDataById(){
    this._profileService.getUserById(this.loggedUserId).subscribe(
      response => {
          console.log("Response - ",response)
          this.loggedUserData = response.user
          console.log(this.loggedUserData.id)
          console.log(this.userId)
          this.getProfileDataById()
      }
    )
  }
  // Get user's profile data
  getProfileDataById(){
    this._profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          console.log(this.profileData.id)
          console.log(this.userId)
          this.formatSkillsInterestsWorkEducation()
          if(this.userConnections!){
            this.getConnections()
          }
      }
    )
  }

  // MY POSTS
  getAllPostsForLoggedUser(){
    this._postService.getAllPostsForLoggedUser().subscribe(
      response => {
        console.log("getAllPostsForLoggedUser - RESPONSE - ",response.userPosts);
        this.userPosts = response.userPosts;        
        this.formatPosts(".")
      }
    )
  }
  // MY FRIEND'S POST
  getAllFriendsPost(idPost: any){
    this._postService.getAllPostsByUserId(this.userId).subscribe(
      response => {
        console.log("getAllPostsForLoggedUser - RESPONSE - ",response.userPosts);
        this.userPosts = response.userPosts;
        this.formatPosts(idPost)
      }
    )
  }

  // Formatters
  formatPosts(idPost: any){
    for(let i=0; i< this.userPosts.length; i++){
      this.userPosts[i].isDislikedByLoggedUser = false;
      this.userPosts[i].isLikedByLoggedUser = false;
      this.userPosts[i].addNewComment = "";
      if(this.userPosts[i].id === idPost){
        this.userPosts[i].showComments = true;
        this.userPosts[i].showAddComment = true;
      }else{
        this.userPosts[i].showComments = false;
        this.userPosts[i].showAddComment = false;
      }
      for(let j=0; j<this.userPosts[i].likes.length; j++){
        let userWhoLiked = this.userPosts[i].likes[j]
        if(userWhoLiked == this.loggedUserId){
          this.userPosts[i].isLikedByLoggedUser = true;
        }
      }
      for(let j=0; j<this.userPosts[i].dislikes.length; j++){
        let userWhoDisliked = this.userPosts[i].dislikes[j]
        if(userWhoDisliked == this.loggedUserId){
          this.userPosts[i].isDislikedByLoggedUser = true;
        }
      }
/*

      for(let j=0; j<this.userPosts[i].reactions.length; j++){
        if(this.userPosts[i].likes){
          this.userPosts[i].numberOfLikes++;
          if(this.userPosts[i].reactions[j].userId == this.loggedUserId){
            this.userPosts[i].isLikedByLoggedUser = true;
          }
        }
        if(this.userPosts[i].reactions[j].disliked){
          this.userPosts[i].numberOfDislikes++;
          if(this.userPosts[i].reactions[j].userId == this.loggedUserId){
            this.userPosts[i].isDislikedByLoggedUser = true;
          }
        }
      }

      */
      for(let j=0; j<this.userPosts[i].comments.length; j++){
        if(this.userPosts[i].comments[j].userId){
          this._profileService.getUserById(this.userPosts[i].comments[j].userId).subscribe(
            response => {
              this.users.set(this.userPosts[i].comments[j].userId, response.user)
            })
        }
        let date = new Date(this.userPosts[i].comments[j].createdAt).getTime();
        this.userPosts[i].comments[j].createdAt = this.formatPostDates(date)
      }
      let date = new Date(this.userPosts[i].createdAt).getTime();
      this.userPosts[i].createdAt = this.formatPostDates(date)
    }
    console.log(this.userPosts)
    console.log(this.userPosts)
  }
  formatSkillsInterestsWorkEducation(){
    this.profileData.skills = this.profileData.skills.split(',')
    this.profileData.interests = this.profileData.interests.split(',')
    this.profileData.work = this.profileData.work.split(',')
    this.profileData.education = this.profileData.education.split(',')
  }
  formatPostDates(date: number) {
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
  linkify(text: string) {
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
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
  // Connection methods
  getConnections(){
    this._connectionService.getConnectionsByUserId(this.loggedUserId).subscribe(
      response => {
        console.log("getConnectionsByUserId - RESPONSE - ",response)
        this.userConnections = response;
        this.findOutWhoIsThisUser();
      }
    )
  }
  findOutWhoIsThisUser(){
    if(this.isMyProfile(this.profileData.id)){
      this.getAllPostsForLoggedUser()
    }else if(this.isInConnections(this.profileData.id)){
      this.getAllFriendsPost('.')
    }else if(this.isBlocked(this.profileData.id)){
      return
    }else if(this.profileData.isPrivateProfile === "false"){
      this.getAllFriendsPost('.')
    }
  }

    // My Connections - Actions
    popUpAction(message:string, userId:string, gender:string, username: string, name: string)  {
      let imagePath = 'http://xsgames.co/randomusers/assets/avatars/'+ gender +'/' + userId + '.jpg'
      let popUpTitle = message + ' ' + name +  '?'
      let popUpText = (gender? 'Her': 'His') + ' username is: ' + username + '\n'
      Swal.fire({
        title: popUpTitle,
        text: popUpText,
        showCloseButton: true,
        showDenyButton: true,
        focusConfirm: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        background: '#1e2126',
        color: '#c4c4c4',
        imageUrl: imagePath,
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: username + "'s profile picture",
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.connectionActionHandler(message, userId)
        }else if (result.isDenied) {
          Swal.fire({
            background: '#1e2126',
            color: '#c4c4c4',
            title: 'Action was denied!',
            text: '',
            icon: 'info'
          })
        }
      })
  
    }
    connectionActionHandler(message: string, userId: string){
      switch(message) { 
        case 'Add friend': { 
          console.log("ADD FRIEND")
          this._connectionService.addFriend(userId).subscribe(
            response => {
              console.log("ADD FIREND - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        } 
        case 'Unfriend': { 
          console.log("UNFRIEND")
          this._connectionService.unfriend(userId).subscribe(
            response => {
              console.log("UNFRIEND - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        } 
        case 'Block': { 
          console.log("BLOCK")
          this._connectionService.block(userId).subscribe(
            response => {
              console.log("BLOCK - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        }
        case 'Unblock': { 
          console.log("UNBLOCK")
          this._connectionService.unblock(userId).subscribe(
            response => {
              console.log("UNBLOCK - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        } 
        case 'Accept': { 
          console.log("ACCEPT")
          this._connectionService.accept(userId).subscribe(
            response => {
              console.log("ACCEPT - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        } 
        case 'Decline': { 
          console.log("DECLINE")
          this._connectionService.decline(userId).subscribe(
            response => {
              console.log("DECLINE - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        }
        case 'Cancel friend request': { 
          console.log("CANCEL FRIEND REQUEST")
          this._connectionService.cancel(userId).subscribe(
            response => {
              console.log("CANCEL - RESPONSE - ",response)
            })
          this.reloadSite()
          break; 
        } 
        default: { 
           //do nothing; 
           break; 
        } 
     } 
    };
    refreshConnections(){
      this.getConnections();
    }
  
  // Write and Send comment
  sendComment(text: string, postId: string){
    let comment = {idPost: postId, 
                   text: text //.trim()
                  }
    console.log("WRITE AND SEND COMMENT - ", comment)
    this._postService.sendCommentToUserPost(comment).subscribe(
      response => {
        console.log("Response CHAT- ",response)
        this.getAllFriendsPost(postId)
    })
  }
  // Add reaction to PostService
  like(postId: string){
    this._postService.like(postId).subscribe(
      response => {
        console.log("Response LIKE - ",response)
        this.getAllFriendsPost(".") // or: this.getAllFriendsPost(".")
    })
  }
  dislike(postId: string){
    this._postService.dislike(postId).subscribe(
      response => {
        console.log("Response DISLIKE - ",response)
        this.getAllFriendsPost(".") // or: this.getAllFriendsPost(".")
    })
  }

  // CREATE USER POST

  selectPostImage(){
    var input = document.getElementById('selectedFile');
    if(input)input.click()
  }
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.postImageIsSelected = true;
          const imgBase64Path = e.target.result;
          this.postImageBase64 = imgBase64Path;         
          this.isImageSaved = true;
          console.log(imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
  createPost(){
    this.createPostText = this.createPostText.trim()
    if(this.createPostText == "" && this.postImageBase64 == "") return
    var userPost = 
      { "userId": this.loggedUserId,
        "text": this.createPostText,
        "imagePath": this.postImageBase64,
      }
    this._postService.createUserPost(userPost).subscribe(
      response => {
        console.log("Response CHAT- ",response)
        this.createPostText = "";
        this.postImageBase64 = "";
        this.postImageIsSelected = false;
        this.getProfileDataById()
      })
  }


  cancelPostImage(){
    this.postImageIsSelected = false;
    this.postImageBase64 = "";
  }


  // Boolean helper methods
  isMyProfile(userId:string){ 
    if(this.loggedUserId == userId){
      return true
    }
    return false
  }
  isInConnections(userId:string){
    if (this.userConnections.connections){
      if(this.userConnections.connections.includes(userId+'')){
        return true
      }
    }
    return false
  }
  isNotFriend(userId:string){}
  isBlocked(userId:string){
    if (this.userConnections.blocked){
      if(this.userConnections.blocked.includes(userId+'')){
        return true
      }
    }
    return false
  }
  isPendingUser(userId:string){
    if (this.userConnections.waitingResponse){
      if(this.userConnections.waitingResponse.includes(userId+'')){
        return true
      }
    }
    return false
  }
  isUserWithRequest(userId:string){
    if (this.userConnections.requests){
      if(this.userConnections.requests.includes(userId+'')){
        return true
      }
    }
    return false
  }

  //Reloads:
  reloadSite() {window.location.href = "/profile/"+this.profileData.id;}

  //Redirections:
  redirectChats() { window.location.href = "/chat";  };
  redirectToUserProfile(id: number) { window.location.href = "/profile/"+ id;  };
  redirectChatsWithUser(id: number){ window.location.href = "/chat?userId="+ id}
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy" };



  }
