import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Document} from './document';
import {Observable} from 'rxjs';
import {Groups} from './groups';
import {Friends} from './groups'



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  public groupname;
  user:String;
  groups = Groups;
  fileString:any= "";
  views:Array<{user:String, message:String}>=[]
  constructor(private socket: Socket,) {
    console.log(this.views)
   }
  
  joinroom(data){
    this.socket.emit('join',data);
  }
  friend(data){
    this.socket.emit("friend",data)
  }
   friends(){
    let observable = new Observable<{users}>(observer=>{
      this.socket.on('friends',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
    })
    return observable;
  }
 
  users(data){
    this.socket.emit("users",data)
  }
  allusers(){
    let observable = new Observable<{users}>(observer=>{
      this.socket.on('all users',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
    })
    return observable;
  }
  allFriends(){
    let observable = new Observable<{response}>(observer=>{
      this.socket.on('all friends',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
    })
    return observable;
  }
  add(data){
    this.socket.emit("add",data)
  }
  addedfriend(){
    let observable = new Observable<{user:String,message:String}>(observer=>{
      this.socket.on('added friend',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
  
    })
    return observable;
  }
   added(){
    let observable = new Observable<{user:String,message:String}>(observer=>{
      this.socket.on('added',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
  
    })
    return observable;
  }
newuserjoined(){
  let observable = new Observable<{user:String,message:String}>(observer=>{
    this.socket.on('new user joined',(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}

  })
  return observable;
}
leftroom(data){
  this.socket.emit('left',data);
}
userleftroom(){
  let observable = new Observable<{user:String,message:String}>(observer=>{
    this.socket.on('left room',(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}

  })
  return observable;
}
sendmessage(data){
  this.socket.emit('message',data)
}
newmessagerecieved(){
  let observable = new Observable<{user:String,message:String,image:String,room:String}>(observer=>{
    this.socket.on('new message',(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}
    
  })
  return observable;
}
 friendmessage(data){
  this.socket.emit('friendmessage',data)
   }
newfriendmessage(){
  let observable = new Observable<{user:String, message:String}>(observer=>{
    this.socket.on('new friendmessage',(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}
    
  })
  return observable;
}
senderfriendmessage(){
  let observable = new Observable<{user:String, message:String,image:String}>(observer=>{
    this.socket.on('sender friendmessage',(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}
    
  })
  return observable;
}
privatechat(data){  
  this.socket.emit('privatechatroom',data)
}
senderonline(){
  let observable = new Observable<{online:String}>(observer=>{this.socket.on('sender online',(data)=>{ observer.next(data); })
  return ()=>{this.socket.disconnect()}});return observable;
}
 online(){
  let observable = new Observable<{online:String}>(observer=>{this.socket.on('online',(data)=>{ observer.next(data); })
  return ()=>{this.socket.disconnect()}});return observable;
}
offline(){
  let observable = new Observable<{offline:String}>(observer=>{this.socket.on('offline',(data)=>{ observer.next(data); })
  return ()=>{this.socket.disconnect()}});return observable;
}
privatechatleft(data){
  this.socket.emit('privatechatleft',data)
}
friendson(data){
 this.socket.emit("friendmessage on",data)
}
messageondisplay(){
  let observable = new Observable<{result}>(observer=>{this.socket.on('displayfriendmessage',(data)=>{ observer.next(data); })
  return ()=>{this.socket.disconnect()}});return observable;
}
messageon(data){
 return this.socket.emit('message on',data)
}
 groupjoin(data){
  return this.socket.emit('groupjoin',data)
 }
 groupverify(){
  let observable = new Observable<{result}>(observer=>{this.socket.on('groupverify',(data)=>{ observer.next(data); })
  return ()=>{this.socket.disconnect()}});return observable;
}
messagedisplay(){
      let observable = new Observable<{result}>(observer=>{this.socket.on('displaymessage',(data)=>{ observer.next(data); })
      return ()=>{this.socket.disconnect()}});return observable;
  }
 register(data){
     this.socket.emit('signup',data);
    }
  newregister(){
    let observable = new Observable<{firstname:String,img:String}>(observer=>{
      this.socket.on('new user sign up',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
  
    })
    return observable;
  }
  profileImage(data){
    this.socket.emit('profileImage',data)
  }
  newProfileImage(){
      let observable = new Observable<{result}>(observer=>{
        this.socket.on('new profileImage',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }
  fetchdata(data){
    this.socket.emit('fetchdata',data)
  }
  newdata(){
      let observable = new Observable<{result}>(observer=>{
        this.socket.on('new data',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }
  login(data){
    this.socket.emit('login',data)
  }
  newlogin(){
      let observable = new Observable<{Object }>(observer=>{
        this.socket.on('new login',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }

   create(data){
    this.socket.emit('create',data)
  }
  createGroup(){
      let observable = new Observable<{message:String}>(observer=>{
        this.socket.on('create group',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }
}
