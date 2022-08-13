import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  userId!: any;
  profileData: any;
  selectedUser: any;
  loggedUserProfilePicturePath: any;
  selectedUserProfilePicturePath: any;

  searchedUsers: any[] = [];
  searchActive: boolean = false;
  searchText: string = "";
  searchedText: string = "";
  numberOfChats: number = 0;
  numberOfSearchResults: number = 0;

  userConnections: {
    connections?: any[];
    requests?: any[];
    waitingResponse?: any[];
    blocked?: any[];
  } = {};
  userConnectionDetails: any = [];
  numberOfConnections?: number;

  showPanel: number = 0;

  constructor(private _AuthenticationService: AuthenticationService, 
              private _profileService: ProfileService,
              private _connectionService: ConnectionService,
              private http: HttpClient) { }

  ngOnInit(): void {
  this.userId = localStorage.getItem('userId')
  this.getUserDataById(this.userId)

  this.getConnections()

  }

  getUserDataById(userId: string){
    this._profileService.getUserById(userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          this.setLoggedUserProfilePicture(this.profileData);
      })
  }

    // Search
    searchUsersByUsername(){
      this.searchActive = true;
      this.searchedText = this.searchText;
        this._profileService.searchLoggedUser(this.searchText).subscribe(
        response => {
          console.log("Response LOGGED USER- ",response)
          this.searchedUsers = response.Users
          console.log("Response - ", this.searchedUsers)
          this.numberOfSearchResults = this.searchedUsers.length
        })
    }
    clearSearchResult(){
      this.searchActive = false;
      this.searchedText = "";
      this.numberOfSearchResults = 0;
      this.searchedUsers = [];
    }


  setLoggedUserProfilePicture(profileData: any){
    if(profileData.gender === 'male'){
      this.loggedUserProfilePicturePath = 'http://xsgames.co/randomusers/assets/avatars/male/'+profileData.userId+'.jpg'
    }else if(profileData.gender === 'female'){
      this.loggedUserProfilePicturePath = 'http://xsgames.co/randomusers/assets/avatars/female/'+profileData.userId+'.jpg'
    }
  }
  getSelectedUserDataById(userId: string){
    this._profileService.getUserById(userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.selectedUser = response.user
          this.setSelectedUserProfilePicturePath(this.selectedUser)
          this.setChatScrollerToBottom()

      })
  }
  setChatScrollerToBottom(){
    setTimeout(function(){
      var scrollChat = document.getElementById('chatBox')
      if(scrollChat){
        console.log("SCROLL EXISTS")
        scrollChat.scrollTop = scrollChat.scrollHeight;
      }
    }, 50)
  }
  setSelectedUserProfilePicturePath(selectedUser: any){
    if(selectedUser.gender === 'male'){
      this.selectedUserProfilePicturePath = 'http://xsgames.co/randomusers/assets/avatars/male/'+selectedUser.userId+'.jpg'
    }else if(selectedUser.gender === 'female'){
      this.selectedUserProfilePicturePath =  'http://xsgames.co/randomusers/assets/avatars/female/'+selectedUser.userId+'.jpg'
    }
  }

  getConnections(){
    this._connectionService.getConnectionsByUserId(this.userId).subscribe(
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
  isMyProfile(userId:string){ 
    if(this.userId == userId){
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
  reloadSite(){window.location.href = "/chat";}
  //Redirections:
  redirectToUserProfile(id: number) { window.location.href = "/profile/"+ id;  };
  redirectConnections() { window.location.href = "/connections";  };
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy"; };

}
