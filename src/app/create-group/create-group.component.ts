import { Component, OnInit } from '@angular/core';
import {DocumentService} from '../../document.service'
import { Friends } from 'src/groups';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  friends
  user
  notification
  groupname;
  discription;
  inp:Boolean=false;
  friendArray:Array<{friend:String}>=[]
  constructor( private documentservice:DocumentService) {
    this.documentservice.friends().subscribe(data => {this.friends = data; console.log(data)})
    this.documentservice.createGroup().subscribe(data => this.notification = data)
   }

  ngOnInit() {
    this.user = this.documentservice.user;
    this.documentservice.friend(this.user)
  this.inp=false;

  }
  friedname(a){
   this.friendArray.push(a)
   console.log(this.friendArray)
  }
  create(){
    this.documentservice.create({user:this.user,groupname:this.groupname,discription:this.discription})
  this.inp=true;

  }

}
