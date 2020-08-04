import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormControl } from '@angular/forms';
import {DocumentService} from '../../document.service';
import {Router} from '@angular/router';
// import {HttpClient} from '@angular/common/http'



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
  imgs;
  register_verification;
  // gender;
  response:string="Are you sure you are okay with this";
  showAlert:boolean=true;
  constructor(private fb:FormBuilder,
              private documentservice:DocumentService,
              private router:Router,
              // private http:HttpClient,
    ) {
      this.documentservice.newregister().subscribe(data=>{
        this.submitted=true;
        // console.log(data)
        if (data.error) {
          setTimeout(()=>{
            this.submitted=false;
             this.register_verification='This email has already been used';
            },5000)
        }
        else if (data.success) {
          setTimeout(()=>{
           this.submitted=false;
            this.router.navigate(["/login"]) 
           },5000)
          
        }
      })
     }
  regform=this.fb.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    phone:['',[Validators.required]],
    gender:['',[Validators.required]],

  });
 get firstName(){ return this.regform.get('firstName');}
 get lastName(){ return this.regform.get('lastName');}
 get email(){ return this.regform.get("email");}
 get password(){ return this.regform.get("password");}
 get phone(){ return this.regform.get("phone");}
 get gender(){ return this.regform.get("gender");}


  ngOnInit() {
    // this.user=(JSON.parse(localStorage.test).firstname);
    // if (this.user !="") {
    //   this.router.navigate(["/document"])   
    // } 
  }
 submite():void{
  this.documentservice.register({firstname:this.regform.value.firstName,lastname:this.regform.value.lastName,email:this.regform.value.email,password:this.regform.value.password,phone:this.regform.value.phone,gender:this.regform.value.gender});
//  window.localStorage.test = JSON.stringify({data:{result:{firstname:this.regform.value.firstName,}}});  
  }
 

    // const d =a.target.files[0];
    // this.img =d;
    // let imgP = new FileReader()
    //  this.imgs.addEventListiner('load',imgP)
    // this.img = this.imgs.readAsArrayBuffer(d);
    // console.log(d.name + "" + d.size+" "+d.type)
    // const file =new FormData();
    // file.append("file",this.img);
}
