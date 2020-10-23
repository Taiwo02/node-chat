'use strict'
const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs')
var crypto = require('crypto');
const bodypasser = require('body-parser');
var imgPath = './public/upload/noimage.jpg';
const multer = require('multer');
const upload = multer({dest:'uploads/'})
const path = require('path').join(__dirname +'/public');
const cors = require('cors');
const { resolve } = require('url');
const { async } = require('rxjs/internal/scheduler/async');
const obId = mongoose.Schema.Types.ObjectId;
var usersProjection = { 
  __v: false,
  _id: false,
  password:false,
};

var female;
app.use(cors({origin:"*"}));
app.use(bodypasser.json())
app.use(express.static(path))
app.use(express.static(__dirname+'/dist/socket-app'))
const server = app.listen(process.env.PORT || 1992,(res,err)=>{
  if(err){console.log(err)}
  console.log('started');
  
});
app.get("/*", function(req, res) {
  res.sendFile("index.html", {root: "dist/socket-app/"}
);
});
    // app.get('/',(req,res)=>{
    //   res.send('home page')
    // })
const storage = multer.diskStorage({
    destination:(req,file,callback) =>{
    callback(null,__dirname+"/public/upload")
    },
    filename:(req,file,callback)=>{
     callback(null, Date.now()+file.originalname)
     }
  })
  var uploads =multer({storage:storage});

const store = multer.diskStorage({
    destination:(req,file,callback) =>{
    callback(null,__dirname+"/public/posts")
    },
    filename:(req,file,callback)=>{
     callback(null, Date.now()+file.originalname)
     }
  })
  var images = multer({storage:store});
  // var mon = mongoose.connect('https://cloud.mongodb.com/v2/5f91a6b017919f3a34965643#metrics/replicaSet/5f91a8eaa16a4f74af348e77/explorer/chats', { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true  });

// var mon = mongoose.connect('mongodb+srv://Taiwo:08102637956@local.2trri.mongodb.net/chats?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true  });
mongoose.connect('mongodb://localhost/local', { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true  });

let user_schema= mongoose.Schema({
    firstname:{type:String,require:true,unique:false,},
    lastname:{type:String,require:true,unique:false,}, 
    email:{type:String,require:true,unique:true,}, 
    password:{type:String,require:true,unique:false,},
    phone:{type:Number,require:true,unique:true,},
    gender:{type:String,require:true,unique:false,},
    image:{type:String,require:true,unique:false,},
  })
  const chatModel = mongoose.model('users',user_schema)
   let chat_schema= mongoose.Schema({
     user:{type:String,require:true}, 
     room:{type:String,require:true},
     message:{type:String,require:true},
     image:{type:String,require:true},
     time:{type:String,require:true},
     name:{type:String,require:true}
    })
    
   const chat = mongoose.model('chats',chat_schema)
   let joining_schema= mongoose.Schema({user:String, room:String})
   const joining = mongoose.model('joins',joining_schema)
   let  groupjoins_schema= mongoose.Schema({first:String,second:String})
   const  groupjoins = mongoose.model('groupjoins',groupjoins_schema)
   let  friendchat_schema= mongoose.Schema({sender:String,reciever:String,message:String,image:String})
   const friendchat  = mongoose.model('friendchats',friendchat_schema)
   let  group_schema= mongoose.Schema({creator:{type:String,},name:{type:String,unique:true},discription:{type:String}})
   const group  = mongoose.model('group',group_schema)
   let post_schema = mongoose.Schema({image:String,text:String,time:String,name:String,userimage:String,email:String})
   const post = mongoose.model('posts',post_schema)
   let comment_schema = mongoose.Schema({post_id:String,text:String,time:String,name:String,userimage:String,email:String})
   const comment = mongoose.model('comments',comment_schema)
  //  let  create_schema= mongoose.Schema({creator:String,groupname:String,discription:String})
  //  const create = mongoose.model('chatmes', create_schema)
  

const io = require('socket.io')(server);
io.on("connection", (socket) => {
  socket.emit("connected",{message:"You have connected"})
  console.log("connected")
  socket.on("disconnect",(socket)=>{
    io.emit("left",{message:"disconnected"})
    console.log('discconected')
  })
  socket.on("users",async(data)=>{
        let user = []
        chatModel.find({email:{$ne:data.first}} ,usersProjection,async(err,users)=>{
          for (let index = 0; index < users.length; index++) {
            // console.log(users[index].email)
            groupjoins.find({$or:[{first:data.first,second:users[index].email},{second:data.first,first:users[index].email}]},async(err,response)=>{
              if (response=="") {
                user.push(users[index])
              }
              await  socket.emit("all users",user)
              // await console.log(user)
            })
            
          }
     })
  })
 
  socket.on("friend",(data)=>{
    let friends = []
    groupjoins.find({first:data.user},(err,friend)=>{
      friend.map(s=>{
        chatModel.findOne({email:s.second},usersProjection ,(err, res)=>{
          friends.push(res);
          socket.emit("friends",friends)
      })
      })
 })
})
  socket.on("add",(data)=>{
    // console.log(data)
    var usersdeduct = { 
      __v: false,
      _id: false,
      password:false,
      phone:false,
      email:false,
      image:false,
      lastname:false
    };
    const friend =  new  groupjoins({
      first:data.first,
      second:data.second
      })
      friend.save();
   chatModel.findOne({email:data.second},usersdeduct,(err,res)=>{

      socket.emit('added',{user:res.firstname, message:"has successfully add to your friend"})  
     })
    // chatModel.find({$or:[{firstname: data.first,},{firstname:data.second}]},(err,user)=>{console.log(user) })

})
socket.on('joingroup',(data)=>{
  data.rooms.map(info=>{
    let groupjoin = new joining({
     user:data.user,
     room:info
    })
    groupjoin.save();
  })
  // socket.broadcast.to(data.room)
  // .emit('new user joined',{user:data.user,message:'has joined the group'})
  })
 socket.on('join',(data)=>{
   console.log(data)
   socket.emit('new user joined',{user:data.user,message:'has joined the group'})
   socket.join(data.room);
   })
 socket.on('left',(data)=>{
  socket.broadcast.to(data.room).emit('left room',{user:data.user,message:' has left this group'});
   socket.leave(data.room);
})
socket.on ('message on',async(data)=>{
  let userArray={
    _v:false,
    _id:false
  }
  await io.in(data.room,
    chat.find({room:data.room}, userArray,async(err,result)=>{
      if(err) throw err;
    socket.emit('displaymessage',result)
  }))
})
    socket.on('message',(data)=>{
      let date_ob = new Date();
      let p="";
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
    let year = date_ob.getFullYear();
// current hours
   let hours = date_ob.getHours();
// current minutes
     if (hours<=11) {
       p="am"
     }
     if (hours>=12) {
      p="pm"
    }
   let minutes = date_ob.getMinutes();
   if (minutes<10) {
     minutes = "0"+minutes; 
   }
// current seconds
   let seconds = date_ob.getSeconds();
   let time =year + "-" + month + "-" + date + " " + hours%12 + ":" + minutes + " " +p;
   io.in(data.room).emit('new message',{user:data.user,message:data.message,room:data.room,date:time}) 
   console.log(data)
    let message = new chat({user:data.user,room:data.room,message:data.message,time:time,name:data.name,image:data.image})
      message.save()
})
socket.on('friendmessage',(data)=>{
  socket.broadcast.to(data.reciever).emit('new friendmessage',{user:data.sender,reciever:data.reciever,message:data.message,image:data.image})
  io.in(data.sender).emit('sender friendmessage',{user:data.sender,reciever:data.reciever, message: data.message,image:data.image})
  let friendmessage = new friendchat({
     sender:data.sender,
     reciever:data.reciever,
     message:data.message,
     image:data.image
  })
  friendmessage.save()

})

socket.on('privatechatroom',function(data){
   socket.join(data.sender);
   socket.emit('sender online',{online:data.reciever})
  socket.broadcast.to(data.reciever).emit('online',{online:data.sender})
      })
      socket.on('privatechatleft',(data)=>{
         socket.leave(data.user);
         socket.broadcast.to(data.reciever).emit('offline',{online:"offline"})
      })
socket.on('friendmessage on',(data)=>{
  const schem={
    __v:false,
    _id:false
  }
    friendchat.find({$or:[{sender:data.sender,reciever:data.reciever},{sender:data.reciever,reciever:data.sender}]},schem,(err,result)=>{
      if(err) throw err;
       socket.emit('displayfriendmessage',result)
       })
      })
      socket.on('signup',(data)=>{
        var genderFerify;
        if(data.gender=='male'){
          genderFerify='male.jpg';
        }else if(data.gender=="female"){
          genderFerify ='female.jpg';
        }
    let register = new chatModel({
    firstname:data.firstname,
    lastname:data.lastname,
    email:data.email,
    password:data.password,
    phone:data.phone,
    gender:data.gender,
    image:genderFerify,
  })
  register.save((err,res)=>{
  console.log(err);
  console.log(res);
  socket.emit("register",{success:res,error:err});
  });
        // socket.emit('new user sign up',{firstname:data.firstname,lastname:data.lastname,email:data.email,password:data.password,phone:data.phone,});
    //  fs.readFile('','utf8',function(err, info){
    //   console.log(info)
    //   })
    // if (data.gender==="male") {
      // fs.readFile(__dirname+'/uploading/no-photo.jpg',(err,res)=>{
      //   if(err){console.log(err)}
      //   console.log(res)
      // })     
    // }
    // console.log(img)

  })
 socket.on('login',(data)=>{
   chatModel.findOne({email:data.email,password:data.password,},(err,result)=>{
      socket.emit('new login',{result})
  })
  })
  socket.on('fetchdata',(data)=>{
    chatModel.findOne({email:data},usersProjection,(err,result)=>{
      if (result){ 
        // console.log(result)
        socket.emit('new data',{result})
      }
    })
    })
    var igno={
      _v:false,
      _id:false,
      user:false
    }
    socket.on('group list',(data)=>{
      joining.find({user:data},igno,(err,res)=>{
        socket.emit('list of group',res.sort())
      })
    })
    socket.on('other groups',(data)=>{
      var igno={
        _v:false,
        _id:false,
      }
       let groups=[]
       group.find({},(er,response)=>{
       response.map(list => {
           let gru = list.name;
           joining.findOne({user:data,room:gru},igno,(err,res)=>{
             if(!err && !res){
               groups.push(list)
              }
              socket.emit('other group',groups.sort())
            })
          })
        })
    })
    socket.on('create',(data)=>{
     let creategroup = new group({
      creator:data.user,
      name:data.name,
      discription:data.discription
    })
     creategroup.save((err,res)=>{
       if(err){
        socket.emit('create group',{message:'This group name is exist'})
      }
      else{
        socket.emit('create group',{message:'Created'})
      }


     });

  })   
  socket.on('profileImage',(data)=>{
    // console.log(data)
    socket.emit('new profileImage',{image:data.image})
    var newImage = { $set: {image:data.image}};
    chatModel.updateOne({email:data.username},newImage,(err,result)=>{
      if (result){ 
    }
  })
  chat.updateMany({user:data.username},newImage,(err,result)=>{
    if (result){ 
    }
  })
})
socket.on("post image",(data)=>{
  socket.emit("new post image",{image:data})
})
socket.on("post",(data)=>{
//  console.log(data)
let date_ob = new Date();
      let p="";
      let date = ("0" + date_ob.getDate()).slice(-2);
      // current month
     let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
    let year = date_ob.getFullYear();
// current hours
   let hours = date_ob.getHours();
 if (hours<=9) {
   hours="0"+hours;
 }
   let minutes = date_ob.getMinutes();
   if (minutes<10) {
     minutes = "0"+minutes; 
   }
// current seconds
  //  let seconds = date_ob.getSeconds();
   let time =year + "-" + month + "-" + date + " " + hours + ":" + minutes;
 const posts = new post({
   image:data.image,
   text:data.text,
   time:time,
   name :data.name,
   userimage:data.userimage,
   email:data.email
 })
//  console.log(data)
 posts.save() 
})

socket.on('fetch post', async(data)=>{
  var nofetch={
    __v:false,
  }
  let pos = [];
  try {
    const waiter = await new Promise(async(resolve, reject)=>{
    await post.find({},nofetch,async(err,result)=>{
      // console.log(result)
      await  result.map((d)=>{
        groupjoins.findOne({$or:[{second:d.email},{first:d.email}]},nofetch,(err,res)=>{
          if(err) reject(500);
          if (res || data == d.email) {
            console.log(data)
            comment.find({post_id:d._id},nofetch,async(err,re)=>{
              if(err) reject(600);
              // console.log(re)
              pos.push({post:d,comment:re});
              resolve(pos);
                await socket.emit('all posts', pos)
             
            })
          }
          
        })
        
      })        
      })
    })
 
} catch (err) {
  if(err === 600) socket.emit('all posts', 600);
  if(err === 500) socket.emit('all posts', 500)
}

})

socket.on("comments",(data)=>{
  //  console.log(data)
  let date_ob = new Date();
        // let p="";
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
       let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
      let year = date_ob.getFullYear();
  // current hours
     let hours = date_ob.getHours();
   if (hours<=9) {
     hours="0"+hours;
   }
     let minutes = date_ob.getMinutes();
     if (minutes<10) {
       minutes = "0"+minutes; 
     }
  // current seconds
    //  let seconds = date_ob.getSeconds();
     let time =year + "-" + month + "-" + date + " " + hours + ":" + minutes;
     console.log(data)
   const comments = new comment({
     post_id:data.id,
     text:data.text,
     time:time,
     name :data.name,
     userimage:data.userimage,
     email:data.email
   })
  //  console.log(data)
   comments.save((res,err)=>{
     if (res) {
      socket.emit("newcomment",{message:"success"})
     }
   }) 
  })
  
})
  app.post('/file',uploads.single('file'),(req,res,next)=>{
    const file = req.file;
    res.send(file);
  })
  app.post('/files',images.single('file'),(req,res,next)=>{
    const file = req.file;
    res.send(file);
  })
  