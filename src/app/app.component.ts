import { Component } from '@angular/core';
import {DocumentService} from '../document.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socket-app';
  constructor(private documentservice:DocumentService){}
  ngOnInit(){
    this.documentservice.user=(JSON.parse(localStorage.test).data.result.firstname);
  }

}
