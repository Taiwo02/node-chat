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
  
  imgurl = 'https://chat-node-angular.herokuapp.com/public/upload/';
  imgurlPost = 'https://chat-node-angular.herokuapp.com/public/posts/';
  
  public groupname;
  user:any;
  groups = Groups;
  fileString:any= "";
  notify:any="";
  views:Array<{user:String, message:String}>=[]
  constructor(private socket: Socket,) {
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
   added(){
    let observable = new Observable<{user:String,message:String}>(observer=>{
      this.socket.on('added',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
  
    })
    return observable;
  }
newuserjoineded(){
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
userData(){
  return this.user;
}
newmessagerecieved(){
  let observable = new Observable<{user:String,message:String,room:String,date:String}>(observer=>{
    this.socket.on('new message',(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}
    
  })
  console.log(observable)
  return observable;
}
 friendmessage(data){
  this.socket.emit('friendmessage',data)
   }
newfriendmessage(){
  let observable = new Observable<{user:String, message:String,image:String}>(observer=>{
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
groupjoining(data){
  return this.socket.emit('joingroup',data)
 }
messagedisplay(){
      let observable = new Observable<{result}>(observer=>{this.socket.on('displaymessage',(data)=>{ observer.next(data); })
      return ()=>{this.socket.disconnect()}});return observable;
      }
 register(data){
     this.socket.emit('signup',data);
    }
  newregister(){
    let observable = new Observable<{success:String,error:String}>(observer=>{
      this.socket.on('register',(data)=>{
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
      let observable = new Observable<{result }>(observer=>{
        this.socket.on('new login',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }
   grouplist(data){
     this.socket.emit('group list',data)
     
   }
   listofgroups(){
    let observable = new Observable<{message:String}>(observer=>{
      this.socket.on('list of group',(data)=>{
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
  othergroups(data){
    this.socket.emit('other groups',data)
    
  }
  listofgroup(){
   let observable = new Observable<{message:String}>(observer=>{
     this.socket.on('other group',(data)=>{
       observer.next(data);
     })
     return ()=>{this.socket.disconnect()}
 
   })
   return observable;
}
postImage(data){
 this.socket.emit("post image",data)
}
newPostImage(){
  let observable=new Observable<{image:string}>(observer=>{
    this.socket.on("new post image",(data)=>{
      observer.next(data);
    })
    return ()=>{this.socket.disconnect()}
  })
  return observable;
}
fetchpost(data){
  this.socket.emit("fetch post",data)

}
posts(data){
  this.socket.emit("post",data)

}
newpost(){
  let observable = new Observable<{post:String,text:String,time:String,name:String,userimage:String}>(observer=>{
    this.socket.on("all posts",(data)=>{
         observer.next(data)
    })
    return ()=>{this.socket.disconnect()}
  })
  return observable
}

commented(data){
  this.socket.emit("comments",data)

}
newcomment(){
  let observable = new Observable<{message:String}>(observer=>{
    this.socket.on("newcomment",(data)=>{
         observer.next(data)
    })
    return ()=>{this.socket.disconnect()}
  })
  return observable
}


}
