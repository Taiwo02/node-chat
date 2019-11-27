import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../document.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 users
 first;
 messageArray;
  constructor(private documentservice:DocumentService) { 
   this.documentservice.allusers().subscribe(data => this.users=data)
   this.documentservice.added().subscribe(data => {this.messageArray=data; alert(data.user+" "+data.message)})
   this.documentservice.addedfriend().subscribe(data =>{this.messageArray=data;alert(data.user+" "+data.message)})

  }

  ngOnInit() {
    this.documentservice.users();
    this.first=this.documentservice.user; 
  }
  user(data){
    this.documentservice.add({first:this.first,second:data})
  }

}
