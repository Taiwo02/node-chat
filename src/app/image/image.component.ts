import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Observable, from} from 'rxjs';
import {DocumentService} from '../../document.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  title="fileupload"
 images:File;
 img="";
 detail;
 image;
 username
  constructor( private documentservice:DocumentService, private http:HttpClient) {
    this.documentservice.newdata().subscribe(data =>{
      // console.log(data.result)
      this.detail =  data.result;
      this.image = data.result;
      var hui;
      data.result.image.slice(' http://localhost:4200')

    })
    this.documentservice.newProfileImage().subscribe(data=>{
      console.log(data)
      this.image=data;
      // var filler =data.result.slice(27);
      // console.log(filler)
      // this.documentservice.fetchdata(this.username)
      // console.log(this.detail)

    })
   }

  ngOnInit() {
    this.username=(JSON.parse(localStorage.test).data.result.firstname);
    this.documentservice.fetchdata(this.username)
  }
  changeImage(profileImage){
    var imgh = profileImage.target.files[0]
    // console.log(imgh)
    const formData = new FormData();
    formData.append('file',imgh)
    formData.append('file',this.username)
    this.http.post<any>('http://localhost:1992/file',formData).subscribe(
      (req)=> {console.log(req)
       console.log(req.path.slice(15))
       this.image=req.path.slice(15);
       console.log(this.image)
       this.documentservice.profileImage({username:this.username,image:this.image});
      },
      (error)=>console.log(error)

      )
  }
  // test(a){
  //   if(a!=""){
  //      this.img = a.target.files[0];
  //   } 
  // }
  //   onSubmit(){
  //       console.log(this.img)
  //       const formData = new FormData();
  //       formData.append('file',this.img)
  //        this.http.post<any>('http://localhost:1994/file',formData).subscribe(
  //          (req)=> console.log(req),
  //          (error)=>console.log(error)
  //        )
 
  // }
}
