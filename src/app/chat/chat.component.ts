import { Component, OnInit, OnDestroy } from '@angular/core';
import {DocumentService} from '../../document.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {
name;
message;
user
view:Array<{user:String, message:String}>=[]
viewer;
  constructor(private documentservice:DocumentService) { 
    this.documentservice.newfriendmessage().subscribe(data =>{this.view.push(data);console.log(data)})
   this.documentservice.messageondisplay().subscribe(data => {this.viewer = data;})
  }
  ngOnDestroy(){
    this.documentservice.privatechatleft({user:this.user})
  }

  ngOnInit() {
    this.name = JSON.parse(localStorage.friend).name
    this.user=this.documentservice.user;
    this.documentservice.friendson({sender:this.user,reciever:this.name})
    this.documentservice.joinroom({})
  }
  send(){
    if (this.message!="") {
      this.documentservice.friendmessage({sender:this.user,reciever:this.name,message:this.message})
     this.message=""
    //  console.log({sender:this.user,reciever:this.name,message:this.message})
    }
  }

}
