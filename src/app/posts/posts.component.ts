import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentService } from 'src/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
image;
img=null;
username;
texts=null
tx:Boolean = true;
name;
userImage;
email;
  constructor(public http:HttpClient,public service:DocumentService,public router:Router) {
    this.service.newPostImage().subscribe(data=>{
      console.log(data)
      this.img = data.image;
      this.tx =false
    })
    setTimeout(()=>{
      let details = this.service.userData()
      console.log(details.result.firstname)
      this.image=details.result.image;
      this.service.fetchpost(details.result.email)
      this.name = details.result.firstname+" "+details.result.lastname;
      this.userImage = details.result.image;
      this.email = details.result.email;
    },500)
    // this.service.newdata().subscribe(data=>{
    //   console.log(data)
    //   this.name = data.result.firstname+" "+data.result.lastname;
    //   this.userImage = data.result.image;
    //   this.email = data.result.email;
    // })
   }

  ngOnInit() {
    this.username=(JSON.parse(localStorage.test).data.result.firstname);
    this.service.fetchdata(this.username)
  }
  changeImage(e){
    var imgh = e.target.files[0]
    const formData = new FormData();
    formData.append('file',imgh)
    formData.append('file',this.username)
    // console.log(formData)
      // console.log(formData)
    this.http.post<any>('https://talkerses.herokuapp.com/files',formData).subscribe(
      (req)=> {
       this.image=req.path.slice(38);
       this.service.postImage(this.image)
      },
      (error)=>console.log(error)

      )

  }
  text(){
    this.img =null;
    this.tx=true;
  }
  post(){
    if (this.texts || this.image) {
      this.service.posts({image:this.img,text:this.texts,name:this.name,userimage:this.userImage,email:this.email})
      this.router.navigate(["/document/posts"])
    }
  }
}
