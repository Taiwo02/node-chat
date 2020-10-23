import { Component, OnInit,} from '@angular/core';
import {DocumentService} from '../../document.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  user;
 friends;
  constructor(public documentservice:DocumentService,private router:Router) {
    this.documentservice.friends().subscribe(data => {
      this.friends=data
    })
  }
 
  ngOnInit() {
    this.user= JSON.parse(localStorage.test).data.result.firstname;
  this.documentservice.friend({user:this.user})
  }
  friedname(friend){
    // alert(friend)
    this.documentservice.privatechat({sender:this.user,reciever:friend})
    localStorage.friend = JSON.stringify({name:friend});
    this.router.navigate(['/chat'])
    }

}
