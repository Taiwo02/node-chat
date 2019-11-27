import { Component, OnInit,OnDestroy } from '@angular/core';
// import { DocumentList} from '../document-list/document-list.component'
import {DocumentService} from '../../document.service'
import {Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-grouop-chat',
  templateUrl: './grouop-chat.component.html',
  styleUrls: ['./grouop-chat.component.css']
})
export class GrouopChatComponent implements OnInit,OnDestroy {
  documents:Observable<String[]>;
messageArray:Array<{user:String,message:String}>=[];
user:String;
displaymessages;
messagetext:String;
room:String;
right:Boolean=false;


  constructor(private documentservice:DocumentService) {
    this.documentservice.newuserjoined().subscribe(data => this.messageArray.push(data));
    this.documentservice.userleftroom().subscribe(data=>this.messageArray.push(data));
    this.documentservice.newmessagerecieved().subscribe(data=>{this.messageArray.push(data);
      console.log(data)
    });
    this.documentservice.messagedisplay().subscribe(data=>{this.displaymessages=data;});
    

   }
  ngOnInit() {
    this.room = this.documentservice.groupname
    this.user =this.documentservice.user;
    this.room=(JSON.parse(localStorage.group).groupname);
    this.documentservice.messageon({room:this.room});
    this.documentservice.joinroom({user:this.user,room:this.room});
  }
  ngOnDestroy(){
    (delete(localStorage.group));
    this.documentservice.leftroom({user:this.user,room:this.room})
  }
  sendMessage(){
    console.log(this.room)
    if(this.messagetext != ""){
      this.documentservice.sendmessage({user:this.user,room:this.room,message:this.messagetext})
      this.messagetext="";
      console.log(this.messageArray)
    }
  }

}
