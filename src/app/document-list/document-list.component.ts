import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router'
import {DocumentService} from '../../document.service'

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  document:Observable<String[]>
  public groups; public groupname;currentDoc:String;user:String;room:String;check;ola:String;wo=[];username={};
  // groupverify=(JSON.parse(localStorage.groupverify).groupverify);
  constructor( private documentServise:DocumentService, private router:Router) {}


  ngOnInit() {
    this.user=(JSON.parse(localStorage.test).data.result.firstname)
    this.groups = this.documentServise.groups;
    this.documentServise.groupjoin({user:this.user});

  } 
  sendgroup(a){
    this.documentServise.groupname=a;
    this.documentServise.user=this.user;
    window.localStorage.group = JSON.stringify({user:this.user,groupname:a});
    this.router.navigate(['/friend'])
  }
  
}
