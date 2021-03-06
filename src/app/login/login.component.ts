import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {DocumentService} from '../../document.service'
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  documents:Observable<String[]>;
  submitted:boolean=false;
  show:boolean=true;
  showAlert:boolean=true;
  emai;
  passwor;
  user="";
  response="invalid login";
  


  constructor(
    private router:Router,
    private documentservice:DocumentService,
    private fb:FormBuilder
    ) { 
      
    this.documentservice.newlogin().subscribe(data => {
      this.submitted=true;
      if (data.result!=null) {
        setTimeout(()=>{
          this.submitted=false;
          window.localStorage.test = JSON.stringify({data:{result:{firstname:data.result.email}}});
          this.router.navigate(["/document/posts"])
        },5000)
      } else if (data.result===null){
        setTimeout(()=>{
          this.submitted=false
          this.showAlert=false;
           this.show=false;
          this.router.navigate(["/login"])
         },5000)
      }
    })
  }

  ngOnInit() {
  this.user=(JSON.parse(localStorage.test).firstname);
  if (this.user !=undefined) {
    this.router.navigate(["/document/posts"])   
  }
  }
  regform=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
  });
    get email(){ return this.regform.get("email");}
    get password(){ return this.regform.get("password");}

    submite():void{
        this.documentservice.login({email:this.emai,password:this.passwor})
     
    }
}
