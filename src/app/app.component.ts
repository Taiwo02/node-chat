import { Component } from '@angular/core';
import {DocumentService} from '../document.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'T.Top chat';
  user;
  constructor(private documentservice:DocumentService,private router:Router){
    this.documentservice.newdata().subscribe(
      (data)=>{
        this.documentservice.user=data;
        console.log(this.documentservice.user)
      }
      )
    }
    ngOnInit(){
      this.user=JSON.parse(localStorage.test).data.result.firstname
      // console.log(this.documentservice.notify)
      if (this.user) {
        this.documentservice.fetchdata(JSON.parse(localStorage.test).data.result.firstname)
        this.router.navigate(["/document/posts"])
    }
  }

}
