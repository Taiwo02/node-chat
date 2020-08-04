import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/document.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
 image:null;
 user;
 comment={};
 text;
 name;
 userimage;
 email;
 details
//  posts:Array<{post:String,text:String,time:String,name:String,userimage:String}>=[];
posts;
  constructor(public documentservice:DocumentService) { 
    // this.documentservice.userData().subscribe(data=>{
    // })
    this.documentservice.newpost().subscribe(data=>{
      console.log(data);
      this.posts=data;
    })
    this.documentservice.newcomment().subscribe(data=>{console.log(data)})
    // this.documentservice.imgurl
    // this.documentservice.userData().subscribe(data=>{console.log(data)})
    // setTimeout(()=>{
    //     this.details = this.documentservice.userData()
    //     console.log(this.details)
    //     this.image=this.details.result.image;
    //     this.documentservice.fetchpost(this.details.result.email)

    // },1000)
    // console.log(this.documentservice.user)
    this.documentservice.newdata().subscribe(data=>{
     
      // console.log(data)
    })
  }

  ngOnInit() {
    setTimeout(()=>{
      this.details = this.documentservice.userData()
      console.log(this.details)
      this.image=this.details.result.image;
      this.documentservice.fetchpost(this.details.result.email)

  },1000)
    // this.user=(JSON.parse(localStorage.test).data.result.firstname)
    // this.documentservice.fetchdata(JSON.parse(localStorage.test).data.result.firstname)
  }
  mode(e){
    this.comment=e;
  //  console.log(e)
  }
  commenting(e){
    // console.log(e)
    this.documentservice.commented({id:e,text:this.text,name:this.details.result.firstname+" "+this.details.result.lastname,userimage:this.details.result.image, email:this.details.result.email})

  }

}
