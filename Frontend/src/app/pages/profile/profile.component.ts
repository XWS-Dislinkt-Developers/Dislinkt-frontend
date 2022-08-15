import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILogInInfo } from 'src/app/models/auth/ILogInInfo';
import { ProfileData } from 'src/app/models/profileData.model';
import { ConnectionService } from 'src/app/services/connection.service';
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

  constructor(
    private profileService: ProfileService,
    private _connectionService: ConnectionService,
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
    this.profileService.getUserById(this.userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          console.log(this.profileData.id)
          console.log(this.userId)
          this.formatSkillsInterestsWorkEducation()
          this.isMyProfile(this.userId)
      }
    )
  }
  formatSkillsInterestsWorkEducation(){
    this.profileData.skills = this.profileData.skills.split(',')
    this.profileData.interests = this.profileData.interests.split(',')
    this.profileData.work = this.profileData.work.split(',')
    this.profileData.education = this.profileData.education.split(',')
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
      console.log("TRUE")
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


  }
