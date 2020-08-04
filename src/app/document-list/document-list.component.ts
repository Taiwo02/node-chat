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
  added=[];
  joinedgroups
  public groups; public groupname;currentDoc:String;user:String;room:String;check;ola:String;wo=[];username={};
  // groupverify=(JSON.parse(localStorage.groupverify).groupverify);
  constructor( private documentServise:DocumentService, private router:Router) {
    this.documentServise.listofgroups().subscribe(data=>{
      this.joinedgroups=data
    })
    this.documentServise.listofgroup().subscribe(data=>{
      this.groups=data
    })
  }


  ngOnInit() {
    this.user=(JSON.parse(localStorage.test).data.result.firstname);
    this.documentServise.grouplist(this.user);
    this.documentServise.othergroups(this.user);
    this.documentServise.groupjoin({user:this.user});
  } 
  sendgroup(a){
    this.documentServise.groupname=a;
    this.documentServise.user=this.user;
    window.localStorage.group = JSON.stringify({user:this.user,groupname:a});
    this.router.navigate(['/friend'])
  }
  join(data){
    let index = this.added.indexOf(data)
    if (index>=0) {
      this.added.splice(index,1)
    }else{
      this.added.push(data);
    }

  }
  add(){
    this.documentServise.groupjoining({user:this.user,rooms:this.added})
    this.documentServise.othergroups(this.user);
    this.documentServise.grouplist(this.user);
    this.added=[]
  }
  
}
