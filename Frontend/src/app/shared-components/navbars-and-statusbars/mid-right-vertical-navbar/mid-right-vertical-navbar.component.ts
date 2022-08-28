import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mid-right-vertical-navbar',
  templateUrl: './mid-right-vertical-navbar.component.html',
  styleUrls: ['./mid-right-vertical-navbar.component.css']
})
export class MidRightVerticalNavbarComponent implements OnInit {

  admin: boolean=false;
  user: boolean=false;
  toggleDown: boolean=false;
  whatToShow: number = 0;
  sortedShownNotifications: {
    createdAt: any;
    senderId: string;
    content: string;
    date: number;
  }[] = [];
  usersWithNotifications: Map<string, any> = new Map();
  
    constructor(
      @Inject(DOCUMENT) private document: Document, 
      private router: Router, 
      private authService: AuthenticationService,
      private _profileService: ProfileService,
      private _notificationService: NotificationService) {}
  
    ngOnInit(): void {
     this.admin = this.authService.adminAccess()
     console.log(this.admin)
     this.user = this.authService.userAccess()
     console.log(this.user)
    }
    
    toggleNotifi(){
      this.getNotifications()
      var box  = document.getElementById('box');
      if(box){
        if (this.toggleDown) {
          box.style.height  = '0px';
          box.style.opacity = '0';
          this.toggleDown = false;
        }else {
          box.style.height  = '250px';
          box.style.opacity = '1';
          this.toggleDown = true;
        }
      }
    }

    getProfileDataById(userId: string){
      this._profileService.getUserById(userId).subscribe(
        response => {
            console.log("Response - ",response);
        } )
    }

    getNotifications(){
      var notifications: any[] = [];
      var shownNotifications: any[] = [];
      this._notificationService.getConnectionNotifications().subscribe(
        response => {
          console.log("Response getConnectionNotifications - ",response)
          notifications = [];
          notifications.push(response.response);
          if(this.whatToShow==0 || this.whatToShow==2 || this.whatToShow==4 || this.whatToShow==5)
          notifications.forEach(function(value: any){
            shownNotifications.push(value)
          })
          this._notificationService.getMessageNotifications().subscribe(
            response => {
              console.log("Response getMessageNotifications - ",response)
              notifications = [];
              notifications.push(response.response);
              if(this.whatToShow==0 || this.whatToShow==1 || this.whatToShow==4 || this.whatToShow==6){
                notifications.forEach(function(value: any){
                  shownNotifications.push(value)
                })
              }
              this._notificationService.getPostNotifications().subscribe(
                response => {
                  console.log("Response getPostNotifications - ",response)
                  notifications = [];
                  notifications.push(response.response);
                  if(this.whatToShow==0 || this.whatToShow==3 || this.whatToShow==5 || this.whatToShow==6){
                    notifications.forEach(function(value: any){
                      shownNotifications.push(value)
                    })
                  }
                  console.log("Response ALL NOT - ",shownNotifications)
                  var newArr: any[] = [];
                  for(var i = 0; i < shownNotifications.length; i++)
                  {
                      newArr = newArr.concat(shownNotifications[i]);
                  }
                  console.log("Response ALL NOT after merge - ",newArr);
                  var beforeSortArr: any[] = [];
                  beforeSortArr = newArr.map((obj)=>{
                    return { ...obj, date: new Date(obj.createdAt) };})
                    console.log("Response ALL NOT before sort - ",beforeSortArr);
  
                  var sortArr: any[] = [];
                  sortArr = beforeSortArr.sort(
                    (objA, objB) => objB.date.getTime() - objA.date.getTime(),
                  );
                  console.log("Response ALL NOT afer sort - ",sortArr);
                  this.sortedShownNotifications = sortArr
                  console.log("Response ALL NOT final - ",this.sortedShownNotifications );
                  

                  for(var i = 0; i < this.sortedShownNotifications.length; i++){

                    this.sortedShownNotifications[i].createdAt = this.formatDates(this.sortedShownNotifications[i].date)

                    console.log("Response ALL NOT final -1  - ",this.sortedShownNotifications[i].senderId );
                    let userId = this.sortedShownNotifications[i].senderId
                    if(this.sortedShownNotifications[i].senderId){
                      this._profileService.getUserById(userId).subscribe(
                        r => {
                          console.log("Response ALL NOT final -2  - ",userId );
                          this.usersWithNotifications.set(userId, r.user)
            
                        })
                      }
                      
                  }
                  console.log("userWith NOt", this.usersWithNotifications)


                })
            })
        })
      } 

    formatDates(date: number){
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


    async popUpNotificationSettings(){
      this.toggleNotifi()
      this.sortedShownNotifications = [];
      const { value: fruit } = await Swal.fire({
        title: 'Notification settings',
        input: 'select',
        background: '#1e2126',
        color: '#c4c4c4',
        inputOptions: {
          'Notifications': {
            allNotifications: 'Show all notifications',
            onlyChat: 'Show only message notifications',
            onlyConn: 'Show only connection notifications',
            onlyPost: 'Show only post notifications',
            chatAndConn: 'Show message & connection notifications',
            connAndPost: 'Show connection & post notifications',
            chatAndPost: 'Show message & post notifications',
            none: "Don't show notifications",
          },
        },
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === 'allNotifications') {
              Swal.fire({
              title: 'All notification will be shown.',
              background: '#1e2126',
              color: '#c4c4c4',})
              this.whatToShow = 0;
            } else if (value === 'onlyChat'){
              Swal.fire({
                title:'Show only message notifications.',
                background: '#1e2126',
                color: '#c4c4c4', })
                this.whatToShow = 1;
            } else if (value === 'onlyConn'){
              Swal.fire({
                title:'Show only connection notifications.',      
                background: '#1e2126',
                color: '#c4c4c4',})
                this.whatToShow = 2;
            } else if (value === 'onlyPost'){
              Swal.fire({
                title:'Show only post notifications.',
              background: '#1e2126',
              color: '#c4c4c4',})
              this.whatToShow = 3;
            } else if (value === 'chatAndConn'){
              Swal.fire({
                title:'Show message & connection notifications',
                background: '#1e2126',
                color: '#c4c4c4',})
                this.whatToShow = 4;
            } else if (value === 'connAndPost'){
              Swal.fire({
                title:'Show connection & post notifications',
                background: '#1e2126',
                color: '#c4c4c4',})
                this.whatToShow = 5;
            } else if (value === 'chatAndPost'){
              Swal.fire({
                title:'Show message & post notifications',      
                background: '#1e2126',
                color: '#c4c4c4',})
                this.whatToShow = 6;
            } else if (value === 'none'){
              Swal.fire({
                title:"Don't show notifications",      
                background: '#1e2126',
                color: '#c4c4c4',})
                this.whatToShow = 7;
            } else {
              Swal.fire({
                title:'Nothing is changed.',      
                background: '#1e2126',
                color: '#c4c4c4',})
                this.whatToShow = 8;
            }
          })
        }
      })
      
    }

    //Redirections:
    redirectToUserProfile(id: string) { window.location.href = "/profile/"+ id;  };

}
