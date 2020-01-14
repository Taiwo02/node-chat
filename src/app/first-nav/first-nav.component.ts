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

  constructor(private breakpointObserver: BreakpointObserver,private documentService: DocumentService,private router:Router) {
    // setInterval((()=>{this.progress(); }),500);
    this.documentService.newdata().subscribe(data => {
      console.log(data)
      this.result=data.result;
    })
  }
  ngOnInit() {
    this.username=(JSON.parse(localStorage.test).data.result.firstname);
    this.documentService.fetchdata(this.username);
  }
  logout(){
    (delete(localStorage.test));
    this.router.navigate(["/login"])
  };
  progress(){
    console.log( this.documentService.views);
  }
  

}
