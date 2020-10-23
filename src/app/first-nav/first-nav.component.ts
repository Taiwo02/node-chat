import { Component,OnInit } from '@angular/core';
import {DocumentService} from '../../document.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-first-nav',
  templateUrl: './first-nav.component.html',
  styleUrls: ['./first-nav.component.css']
})
export class FirstNavComponent implements OnInit{
  // userArray:Array<{firstname:String}>=[];
  public username;
  public result;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    details;
    notification
    name:any
    image:any
  view: { user: String; message: String; }[];
    constructor(private breakpointObserver: BreakpointObserver,public documentService: DocumentService,private router:Router) {
      // setInterval((()=>{this.progress(); }),500);
      this.documentService.newdata().subscribe(data => {
        this.name=data.result.firstname
        this.image=data.result.image
        console.log(data)
        
    })
    this.documentService.newfriendmessage().subscribe(
      // (data)=>console.log(data)
    )
  }
  ngOnInit() {
    this.username=(JSON.parse(localStorage.test).data.result.firstname);
    console.log(this.username)
    console.log('hello')
   this.documentService.fetchdata(this.username)
  }
  logout(){
    // (delete(localStorage.test));
    window.localStorage.test = JSON.stringify({data:{result:{firstname:""}}});
    this.router.navigate(["/login"])
  };
  progress(){
    // console.log( this.documentService.views);
    this.view = this.documentService.views
  }
  

}
