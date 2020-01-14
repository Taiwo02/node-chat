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
datauser:String="";
datareciever
 messageNotify:boolean = true;
 views:Array<{user:String,message:String}>=[]
  constructor(private documentservice:DocumentService) { 
    this.documentservice.newfriendmessage().subscribe(data =>{
      if (this.datauser === this.datareciever){
        this.view.push(data);    
        this.documentservice.views.push(data)
        console.log(this.documentservice.views)
      }
    })
    this.documentservice.senderfriendmessage().subscribe(data =>{
      this.view.push(data);
    })
    this.documentservice.online().subscribe(data => { this.datauser = data.online;})
    this.documentservice.senderonline().subscribe(data => { this.datareciever =data.online; }) 
    this.documentservice.offline().subscribe(data => { this.datauser = data.offline;})
    this.documentservice.messageondisplay().subscribe(data => {this.viewer = data;})
  }
  ngOnDestroy(){
    this.documentservice.privatechatleft({user:this.user})
    // this.messageNotify = false;
  }

  ngOnInit() {
    this.name = JSON.parse(localStorage.friend).name
    this.user=this.documentservice.user;
    this.documentservice.friendson({sender:this.user,reciever:this.name})
    // this.documentservice.joinroom({})
    this.documentservice.privatechat({sender:this.user,reciever:this.name})
  }
  send(){
    if (this.message!="") {
      // if (this.datauser ==  "" || this.datauser!=this.datareciever) {
      //   this.messageNotify = false
      // } else {
      //   this.messageNotify = true;
      // }
      this.documentservice.friendmessage({sender:this.user,reciever:this.name,message:this.message,})
     this.message=""
     console.log(this.datauser)
    //  console.log(this.datareciever)
     this.documentservice.privatechat({sender:this.user,reciever:this.name})
    }
    // console.log(this.messageNotify)
  }

}
