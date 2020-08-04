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
  constructor(private documentservice:DocumentService) { 
    this.documentservice.allusers().subscribe(data => {
      this.friendsArray=data
      this.users=data; 
      console.log(this.friendsArray[0].firstname)
      console.log()
      this.first=this.documentservice.user.result.email
        })
    this.documentservice.friends().subscribe(data => {
      // console.log(data)
      this.friends = data;
      
      console.log(this.users)
      console.log(this.friends)
      // for (let index = 0; index < this.users.length; index++){ 
      //   this.available = (this.users[index].firstname)
      //   // console.log('first '+this.available)
      //   for (let i = 0; i < this.friends.length; i++) {
      //     this.total=(this.friends[i].second)
      //     // console.log('second '+this.total)
      //     if(this.available == (this.friends[i].second)){
      //       // this.total=this.available
      //       console.log(this.available)
      //     }
      //   }
      // }
        // console.log(console.log(this.available))
    })
   
   this.documentservice.added().subscribe(data => {this.messageArray=data; alert(data.user+" "+data.message)
  })
   this.documentservice.addedfriend().subscribe(data =>{this.messageArray=data;alert(data.user+" "+data.message)})

  }

  ngOnInit() {
    this.documentservice.users({first:JSON.parse(localStorage.test).data.result.firstname});
    this.documentservice.friend({user:JSON.parse(localStorage.test).data.result.firstname})
  }
  user(data){
    this.documentservice.add({first:this.first,second:data})
  }

}
