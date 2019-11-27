import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import {DocumentService} from '../../document.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
// formGroup=FormGroup;S
  user
  submitted:boolean=false;
  show:boolean=true;
  img;
  response:string="Are you sure you are okay with this";
  showAlert:boolean=true;
  constructor(private fb:FormBuilder,private documentservice:DocumentService,private router:Router) { }
  regform=this.fb.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    phone:['',[Validators.required]],
  });
 get firstName(){ return this.regform.get('firstName');}
 get lastName(){ return this.regform.get('lastName');}
 get email(){ return this.regform.get("email");}
 get password(){ return this.regform.get("password");}
 get phone(){ return this.regform.get("phone");}

  ngOnInit() {
    this.user=(JSON.parse(localStorage.test).firstname);
    if (this.user !="") {
      this.router.navigate(["/document"])   
    } 
  }
 submite():void{
  // this.submitted=true;
  console.log(this.img)
  this.documentservice.register({firstname:this.regform.value.firstName,lastname:this.regform.value.lastName,email:this.regform.value.email,password:this.regform.value.password,phone:this.regform.value.phone,img:this.img});
  this.showAlert=false;
this.show=false;
 this.submitted=true;
 window.localStorage.test = JSON.stringify({data:{result:{firstname:this.regform.value.firstName,}}});
 this.router.navigate(["/document"])   
  }
  no(){
    this.submitted=false;
  }
  test(a){
    if(a!=""){
    const d =a.target.files[0];
    this.img =d;
    console.log(d.name + "" + d.size+" "+d.type)
    // const file =new FormData();
    // file.append("file",this.img);
    }
  }
}
