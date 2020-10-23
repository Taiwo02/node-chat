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
  messageArray:Array<{user:String,message:String,room:String,date:String}>=[];
  user:String;
  displaymessages;
  messagetext:String;
  room:String;
  right:Boolean=false;
  image;
  group;
  roomcheck;
  group_name:null;
  group_image:null;
  naming;
  imaging;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor( private router:Router, private breakpointObserver: BreakpointObserver,public documentservice:DocumentService) {
    
    this.documentservice.listofgroups().subscribe(data=>{
      this.group=data
    })
    this.documentservice.newdata().subscribe(data=>{
      console.log(data)
          this.naming =data.result.firstname;
          this.imaging=data.result.image;
    })
    this.documentservice.newuserjoineded().subscribe(data=>{
      console.log(data)})
    // this.documentservice.newuserjoined().subscribe(
    //   data=>{
    //     console.log(data)
    //   }
    // )
    this.documentservice.newmessagerecieved().subscribe(data=>{
      //  this.documentservice.messageon({room:this.room});
      this.messageArray.push(data);
      console.log(this.messageArray)
      console.log(data)
      // this.roomcheck =data.room;
    });
    this.documentservice.messagedisplay().subscribe(data=>{
      this.displaymessages=data;

      console.log(data)
      
    });
  }
  typing(){
    console.log("typing")
  }
 ngOnInit() {
   this.user =JSON.parse(localStorage.test).data.result.firstname;
   this.room=(JSON.parse(localStorage.group).groupname);
   this.documentservice.messageon({room:this.room});
   this.documentservice.grouplist(this.user);
   this.documentservice. joinroom({user:this.user,room:this.room})
   this.documentservice.fetchdata(this.user)
  //  location.reload()

    if (this.room == "" ) {
      this.router.navigate(["/document/docement-list"]) 
    }
 }
 ngOnDestroy(){
   (delete(localStorage.group));
   this.documentservice.leftroom({user:this.user,room:this.room})
 }
 friends(event){
  this.documentservice.user=this.user;
  window.localStorage.group = JSON.stringify({user:this.user,groupname:event});
  this.documentservice.joinroom({user:this.user,room:this.room});
  this.room=(JSON.parse(localStorage.group).groupname);
  this.documentservice.messageon({room:this.room});
  this.documentservice.joinroom({user:this.user,room:this.room});
  this.documentservice.grouplist(this.user);
 }
 sendMessage(){
  console.log(this.naming,this.imaging)
   if(this.messagetext != ""){
    //  console.log({user:this.user,room:this.room,message:this.messagetext,name:this.name,image:this.imag})
     this.documentservice.sendmessage({user:this.user,room:this.room,message:this.messagetext,name:this.naming,image:this.imaging})
     this.messagetext="";
   }
 }
}
