import { Component,OnInit,OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DocumentService } from 'src/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pnav',
  templateUrl: './pnav.component.html',
  styleUrls: ['./pnav.component.css']
})
export class PnavComponent implements OnInit,OnDestroy {
 name;
message;
user;
friends;
view:Array<{user:String, message:String}>=[]
viewer;
datauser:String="";
datareciever
 messageNotify:boolean = true;
 views:Array<{user:String,message:String}>=[]
 friend_name;
 public image;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public documentservice:DocumentService,private router:Router) {
    this.documentservice.newdata().subscribe(data => {
      this.friend_name=data.result;
      this.image=data.result.image
    })
    this.documentservice.friends().subscribe(data => { 
      this.friends=data
    })
    this.documentservice.newfriendmessage().subscribe(data =>{
      if (this.datauser === this.datareciever){
        this.view.push(data);    
        // this.documentservice.views.push(data)
        console.log(data)
      }else{
        console.log(data);
      }
    })
    // this.documentservice.senderfriendmessage().subscribe(data =>{
    //   this.view.push  (data);
    //   console.log(data)
    // })
    this.documentservice.online().subscribe(data => { this.datauser = data.online;})
    this.documentservice.senderonline().subscribe(data => { this.datareciever =data.online; }) 
    this.documentservice.offline().subscribe(data => { this.datauser = data.offline;})
    this.documentservice.messageondisplay().subscribe(data => {
      this.viewer = data;
    })
  }



  ngOnDestroy(){
    this.documentservice.privatechatleft({user:this.user})
    this.documentservice.notify="";
    // this.messageNotify = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.test).data.result.firstname;  
    this.documentservice.friend({user:this.user})
    this.name = JSON.parse(localStorage.friend).name;
    this.documentservice.notify=this.name;
    this.friedname(this.name)
  }
  send(){
    console.log(this.image)
    if (this.message!="") {
     this.documentservice.friendmessage({sender:this.user,reciever:this.name,message:this.message,image:this.image})
     this.message="";
     this.documentservice.privatechat({sender:this.user,reciever:this.name})
     this.friedname(this.name)
    }
  }
  friedname(friend){
    // this.documentservice.friend({user:this.user})
    this.documentservice.privatechat({sender:this.user,reciever:friend})  
    this.name=friend;
    this.documentservice.fetchdata(this.name);
    this.documentservice.friendson({sender:this.user,reciever:this.name})
    localStorage.friend = JSON.stringify({name:friend});
  }
  bfriends(){
    this.router.navigate(["/document/friends"])
  }

}
