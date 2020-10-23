import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../document.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 users;
 friends;
 first;
 messageArray;
 public available;
  total="";
 friendsArray;
 user_email
  constructor(public documentservice:DocumentService) { 
    this.documentservice.allusers().subscribe(data => {
      this.friendsArray=data
      this.users=data; 
      console.log()
      this.first=this.documentservice.user.result.email
        })
   
   this.documentservice.added().subscribe(data => {
    //  this.messageArray=data; alert(data.user+" "+data.message)
     this.documentservice.users({first:this.user_email})
  })

  }

  ngOnInit() {
    this.documentservice.users({first:JSON.parse(localStorage.test).data.result.firstname});
    this.user_email =JSON.parse(localStorage.test).data.result.firstname
  }
  user(data){
    this.documentservice.add({first:this.first,second:data})
  }

}
