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
 comment:any;
 text:any;
 name:any;
 userimage:any;
 email:any;
 details:any
 post:any;
//  posts:Array<{post:String,text:String,time:String,name:String,userimage:String}>=[];
posts:any;
  constructor(public documentservice:DocumentService) { 
    // this.documentservice.userData().subscribe(data=>{
    // })
    this.documentservice.newpost().subscribe(data=>{
     let pos:any = data;
      // this.posts = pos.sort((a,b) => {return b.post.time - a.post.time})
      // this.posts = pos.sort(function(a, b){return b.post.time-a.post.time});
      // console.log(this.posts)
      this.posts = pos.sort((b, a) => new Date(b.post.time).getTime() - new Date(a.post.time).getTime());
      console.log(this.posts)
      
    })
    
    this.documentservice.newcomment().subscribe(data=>{console.log(data)
    
    
    })
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

  },2000)
    // this.user=(JSON.parse(localStorage.test).data.result.firstname)
    // this.documentservice.fetchdata(JSON.parse(localStorage.test).data.result.firstname)
  }
  mode(e){
    this.comment=e;
  //  console.log(e)
  }
  commenting(e){
    this.documentservice.commented({id:e,text:this.text,name:this.details.result.firstname+" "+this.details.result.lastname,userimage:this.details.result.image, email:this.details.result.email})
    this.text = ""
  }

}
