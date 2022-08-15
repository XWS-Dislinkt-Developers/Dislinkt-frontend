import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILogInInfo } from 'src/app/models/auth/ILogInInfo';
import { ProfileData } from 'src/app/models/profileData.model';
import { ConnectionService } from 'src/app/services/connection.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

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
  myProfile: boolean=false 
  profileData: any

  // Connections data:
  userConnections: {
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
    reactions:{
      disliked: boolean;
      liked: boolean;
      userId: string;
    }[];
        userId: string;
    text: string;
    imagepPath: string;

    createdAt: string;
    showComments:boolean;
    showAddComment: boolean;
    numberOfLikes: number;
    numberOfDislikes: number;
  } [] = [];

  users: Map<string, any> = new Map();

  constructor(
    private _profileService: ProfileService,
    private _connectionService: ConnectionService,
    private _postService: PostService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')
    this.loggedUserId = localStorage.getItem('userId')
    this.getUserById(this.userId)
    this.getConnections()
    
    }

  // Get user's profile data
  getUserById(userId: number){
    this._profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          console.log(this.profileData.id)
          console.log(this.userId)
          this.formatSkillsInterestsWorkEducation()
          if(this.isMyProfile(this.userId)){
            this._postService.getAllPostsForLoggedUser().subscribe(
              response => {
                console.log("getAllPostsForLoggedUser - RESPONSE - ",response.userPosts);
                this.userPosts = response.userPosts;
                for(let i=0; i< this.userPosts.length; i++){
                  this.userPosts[i].showAddComment = false;
                  this.userPosts[i].showComments = false;
                  this.userPosts[i].numberOfLikes = 0;
                  this.userPosts[i].numberOfDislikes =0;
                  for(let j=0; j<this.userPosts[i].reactions.length; j++){
                    if(this.userPosts[i].reactions[j].disliked){
                      this.userPosts[i].numberOfLikes++;
                    }
                    if(this.userPosts[i].reactions[j].liked){
                      this.userPosts[i].numberOfDislikes++;
                    }
                  }
                  for(let j=0; j<this.userPosts[i].comments.length; j++){
                    if(this.userPosts[i].comments[j].userId){
                      this._profileService.getUserById(this.userPosts[i].comments[j].userId).subscribe(
                        response => {
                          this.users.set(this.userPosts[i].comments[j].userId, response.user)
                          console.log("LOAD USERS - ",this.users)
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
            )
          }
      }
    )
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
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";

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
      }
    )
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
          this.refreshConnections()
          break; 
        } 
        case 'Unfriend': { 
          console.log("UNFRIEND")
          this._connectionService.unfriend(userId).subscribe(
            response => {
              console.log("UNFRIEND - RESPONSE - ",response)
            })
          this.refreshConnections()
          break; 
        } 
        case 'Block': { 
          console.log("BLOCK")
          this._connectionService.block(userId).subscribe(
            response => {
              console.log("BLOCK - RESPONSE - ",response)
            })
          this.refreshConnections()
          break; 
        }
        case 'Unblock': { 
          console.log("UNBLOCK")
          this._connectionService.unblock(userId).subscribe(
            response => {
              console.log("UNBLOCK - RESPONSE - ",response)
            })
          this.refreshConnections()
          break; 
        } 
        case 'Accept': { 
          console.log("ACCEPT")
          this._connectionService.accept(userId).subscribe(
            response => {
              console.log("ACCEPT - RESPONSE - ",response)
            })
          this.refreshConnections()
          break; 
        } 
        case 'Decline': { 
          console.log("DECLINE")
          this._connectionService.decline(userId).subscribe(
            response => {
              console.log("DECLINE - RESPONSE - ",response)
            })
          this.refreshConnections()
          break; 
        }
        case 'Cancel friend request': { 
          console.log("CANCEL FRIEND REQUEST")
          this._connectionService.cancel(userId).subscribe(
            response => {
              console.log("CANCEL - RESPONSE - ",response)
            })
          this.refreshConnections()
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
  //reloadSite() {window.location.href = "/";}

  //Redirections:
  redirectChats() { window.location.href = "/chat";  };
  redirectChatsWithUser(id: number){ window.location.href = "/chat?userId="+ id}
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy" };
  redirectToUserProfile(id: number) { window.location.href = "/profile/"+ id  };



  }
