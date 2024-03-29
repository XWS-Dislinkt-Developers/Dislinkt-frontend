import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})


export class ConnectionsComponent implements OnInit {

  userId!: any;
  profileData: any;
  loggedUserProfilePicturePath: any;

  searchedUsers: any[] = [];
  searchActive: boolean = false;
  searchText: string = "";
  searchedText: string ="";
  numberOfSearchResults: number =0;



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
              private activatedRoute: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.getUserDataById(this.userId)
    this.getRouteParam()
  }

  getUserDataById(userId: string){
    this._profileService.getUserById(userId).subscribe(
      response => {
          console.log("Response - ",response)
          this.profileData = response.user
          this.setLoggedUserProfilePicture(this.profileData);
          this.getConnections()
      })
  }
  setLoggedUserProfilePicture(profileData: any){
    if(profileData.gender === 'male'){
      this.loggedUserProfilePicturePath = 'http://xsgames.co/randomusers/assets/avatars/male/'+profileData.userId+'.jpg'
    }else if(profileData.gender === 'female'){
      this.loggedUserProfilePicturePath = 'http://xsgames.co/randomusers/assets/avatars/female/'+profileData.userId+'.jpg'
    }
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
  clearSearchResult(){
      this.searchActive = false;
      this.searchedText = "";
      this.searchText = "";
      this.numberOfSearchResults = 0;
      this.searchedUsers = [];
    }

  // My Connections - Details
  getConnections(){
    this._connectionService.getConnectionsByUserId(this.userId).subscribe(
      response => {
        console.log("getConnectionsByUserId - RESPONSE - ",response)
        this.userConnections = response;
        this.getConnectionDetails(this.showPanel)
      }
    )
  }
  getRouteParam() {
      this.activatedRoute.queryParams.subscribe(params=>{
        console.log("PARAMS FROM CHAT: ",params)
        if(params.showPanel=="blocking"){
          this.showBlockings()        }
      })
  
  }
  getConnectionDetails(panelNumber: number){
      this.userConnectionDetails =[];
      console.log(this.userConnections.connections);
      if (this.userConnections.connections && panelNumber == 1){
        this.numberOfConnections = this.userConnections.connections.length!
        for (let i = 0; i < this.numberOfConnections; i++) {
          this._profileService.getUserById(this.userConnections.connections[i]).subscribe(
            response => {
                console.log("Response - ",response)
                this.userConnectionDetails[i] = response.user
            })
        }
      }
      if (this.userConnections.requests && panelNumber == 2){
        this.numberOfConnections = this.userConnections.requests.length!
        for (let i = 0; i < this.numberOfConnections; i++) {
          this._profileService.getUserById(this.userConnections.requests[i]).subscribe(
            response => {
                console.log("Response - ",response)
                this.userConnectionDetails[i] = response.user
            })
        }
      }
      if (this.userConnections.waitingResponse && panelNumber == 3){
        this.numberOfConnections = this.userConnections.waitingResponse.length!
        for (let i = 0; i < this.numberOfConnections; i++) {
          this._profileService.getUserById(this.userConnections.waitingResponse[i]).subscribe(
            response => {
                console.log("Response - ",response)
                this.userConnectionDetails[i] = response.user
            })
        }
      }
      if (this.userConnections.blocked && panelNumber == 4){
        this.numberOfConnections = this.userConnections.blocked.length!
        for (let i = 0; i < this.numberOfConnections; i++) {
          this._profileService.getUserById(this.userConnections.blocked[i]).subscribe(
            response => {
                console.log("Response - ",response)
                this.userConnectionDetails[i] = response.user
            })
        }
      }
      this.searchUsersByUsername()
      console.log("userFriendsDetails - ",this.userConnectionDetails)
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
            this.refreshConnections()
          })
        break; 
      } 
      case 'Unfriend': { 
        console.log("UNFRIEND")
        this._connectionService.unfriend(userId).subscribe(
          response => {
            console.log("UNFRIEND - RESPONSE - ",response)
            this.refreshConnections()
          })
          break; 
      } 
      case 'Block': { 
        console.log("BLOCK")
        this._connectionService.block(userId).subscribe(
          response => {
            console.log("BLOCK - RESPONSE - ",response)
            this.refreshConnections()
          })
        break; 
      }
      case 'Unblock': { 
        console.log("UNBLOCK")
        this._connectionService.unblock(userId).subscribe(
          response => {
            console.log("UNBLOCK - RESPONSE - ",response)
            this.refreshConnections()
          })
        break; 
      } 
      case 'Accept': { 
        console.log("ACCEPT")
        this._connectionService.accept(userId).subscribe(
          response => {
            console.log("ACCEPT - RESPONSE - ",response)
            this.refreshConnections()
          })
        break; 
      } 
      case 'Decline': { 
        console.log("DECLINE")
        this._connectionService.decline(userId).subscribe(
          response => {
            console.log("DECLINE - RESPONSE - ",response)
            this.refreshConnections()
          })
        break; 
      }
      case 'Cancel friend request': { 
        console.log("CANCEL FRIEND REQUEST")
        this._connectionService.cancel(userId).subscribe(
          response => {
            console.log("CANCEL - RESPONSE - ",response)
            this.refreshConnections()
          })
        break; 
      } 
      default: { 
         //do nothing; 
         break; 
      } 
   } 

  };
  refreshConnections(){
    this.getConnections()
  }
  delay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


  //Show/Hide panels:
  showDefault(){ this.showPanel = 0;}
  showFriends(){ 
    this.showPanel = 1; 
    this.getConnectionDetails(1)
  }
  showRequests(){ 
    this.showPanel = 2;
    this.getConnectionDetails(2)
  }
  showPendings(){ 
    this.showPanel = 3;
    this.getConnectionDetails(3)
  }
  showBlockings(){ 
    this.showPanel = 4;
    this.getConnectionDetails(4)
  }

  //Reloads:
  reloadSite() {window.location.href = "/connections";}
  //Redirections:
  redirectChats() { window.location.href = "/chat";  };
  redirectChatsWithUser(id: number){ window.location.href = "/chat?userId="+ id}
  redirectSettingsAndPrivacy() { window.location.href = "/settings-and-privacy" };
  redirectToUserProfile(id: number) { window.location.href = "/profile/"+ id  };

}



