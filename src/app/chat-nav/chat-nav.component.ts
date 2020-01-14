import { Component, OnInit,OnDestroy  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {DocumentService} from '../../document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './chat-nav.component.html',
  styleUrls: ['./chat-nav.component.css']
})
export class ChatNavComponent  implements OnInit,OnDestroy {
  documents:Observable<String[]>;
  messageArray:Array<{user:String,message:String,image:String,room:String}>=[];
  user:String;
  displaymessages;
  messagetext:String;
  room:String;
  right:Boolean=false;
  image;
  group;
  roomcheck;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( private router:Router, private breakpointObserver: BreakpointObserver,private documentservice:DocumentService) {

    this.documentservice.newmessagerecieved().subscribe(data=>{
      this.messageArray.push(data);
      this.roomcheck =data.room;
      console.log(data.room)
    });
    this.documentservice.messagedisplay().subscribe(data=>{
      this.displaymessages=data;
  
    });
  }
  typing(){
    console.log("typing")
  }
 ngOnInit() {
  //  this.room = this.documentservice.groupname
   this.user =this.documentservice.user;
   this.room=(JSON.parse(localStorage.group).groupname);
   this.documentservice.messageon({room:this.room});
   this.documentservice.joinroom({user:this.user,room:this.room});
   this.group = this.documentservice.groups;
   console.log(this.group)
    if (this.room != "" ) {
      this.router.navigate(["/document/docement-list"]) 
    }
 }
 ngOnDestroy(){
   (delete(localStorage.group));
   this.documentservice.leftroom({user:this.user,room:this.room})

 }
 friends(event){
  this.documentservice.groupname=event;
  this.documentservice.user=this.user;
  window.localStorage.group = JSON.stringify({user:this.user,groupname:event});
  this.documentservice.joinroom({user:this.user,room:this.room});
  // this.room = this.documentservice.groupname
  // this.user =this.documentservice.user;
  this.room=(JSON.parse(localStorage.group).groupname);
  this.documentservice.messageon({room:this.room});
  this.documentservice.joinroom({user:this.user,room:this.room});
  // this.group = this.documentservice.groups;
  // console.log(this.room)
  // this.router.navigate(['/friend'])
  // location.reload();
 
 }
 sendMessage(){
   console.log(this.room)
   if(this.messagetext != ""){
     this.documentservice.sendmessage({user:this.user,room:this.room,message:this.messagetext,image:this.image})
     this.messagetext="";
     console.log({room:this.room,roomcheck:this.roomcheck})
   }
 }
}
