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
 image="";
 username
  constructor( public documentservice:DocumentService, private http:HttpClient) {
    this.documentservice.newdata().subscribe(data =>{
      // console.log(data.result.image)
      this.detail =  data.result;
      this.image = data.result.image;

    })
    // this.documentservice.newProfileImage().subscribe(data=>{
    //   console.log(data.result.image)
    //    this.image=data.image;
    //   var filler =data.result.slice(27);
    //   console.log(filler)
    //   this.documentservice.fetchdata(this.username)
    //   console.log(this.detail)

    // })
   }

  ngOnInit() {
    this.username=(JSON.parse(localStorage.test).data.result.firstname);
    this.documentservice.fetchdata(this.username)
  }
  changeImage(profileImage){
    var imgh = profileImage.target.files[0]
    const formData = new FormData();
    formData.append('file',imgh)
    formData.append('file',this.username)
    // console.log(formData)
      // console.log(formData)
    this.http.post<any>('https://chat-node-angular.herokuapp.com/file',formData).subscribe(
      (req)=> {
        // console.log(req)
      //  console.log(req.path.slice(40));
       this.image=req.path.slice(39);
      //  console.log(this.image)
       this.documentservice.profileImage({image:this.image,username:this.username})
      },
      (error)=>console.log(error)

      )
  }
  test(a){
    // if(a!=""){
    //    this.img = a.target.files[0];
    // } 
  }
    onSubmit(){
        // console.log(this.img)
        // const formData = new FormData();
        // formData.append('file',this.img)
        //  this.http.post<any>('https://chat-node-angular.herokuapp.com/file',formData).subscribe(
        //    (req)=> console.log(req),
        //    (error)=>console.log(error)
        //  )
 
  }
}
