import { Component, OnInit,} from '@angular/core';
import {DocumentService} from '../../document.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  user;
 friends;
  constructor(private documentservice:DocumentService) {
    this.documentservice.friends().subscribe(data => {console.log(data); this.friends=data})
  }
 
  ngOnInit() {
  this.user = this.documentservice.user;
  this.documentservice.friend({user:this.user})
  }
  friedname(friend){
    // this.documentservice.privatechat({sender:this.user,reciever:friend})
    localStorage.friend = JSON.stringify({name:friend});
  }

}
