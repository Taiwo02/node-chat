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
const path = require('path').join(__dirname + '/src/assets/images');
const cors = require('cors')

var female;
app.use(cors({origin:"*"}));
app.use(bodypasser.json())
app.use(express.static(path))
const server = app.listen(1992,(res,err)=>{
  if(err){console.log(err)}
  console.log('started');
  
});
    app.get('/',(req,res)=>{
      res.send('home page')
    })
const storage = multer.diskStorage({
  destination:(req,file,callback) =>{
    callback(null,__dirname+"/src/assets/images")
  },
  filename:(req,file,callback)=>{
     callback(null, Date.now()+file.originalname)
   }
  })
  var contents;
var uploads =multer({storage:storage});
mongoose.connect('mongodb://localhost/local', { useNewUrlParser: true,useUnifiedTopology: true  });
  let user_schema= mongoose.Schema({
    firstname:{type:String,require:true,},
    lastname:{type:String,require:true}, 
    email:{type:String,require:true,}, 
    password:{type:String,require:true},
    phone:{type:Number,require:true},
    gender:{type:String,require:true},
    image:{type:String,require:true},
  })
  const chatModel = mongoose.model('users',user_schema)
   let chat_schema= mongoose.Schema({user:String, room:String,message:String,image:String})
   const chat = mongoose.model('chats',chat_schema)
   let joining_schema= mongoose.Schema({user:String, room:String,message:String})
   const joining = mongoose.model('joins',joining_schema)
   let  groupjoins_schema= mongoose.Schema({first:String,second:String})
   const  groupjoins = mongoose.model('groupjoins',groupjoins_schema)
   let  friendchat_schema= mongoose.Schema({sender:String,reciever:String,message:String})
   const friendchat  = mongoose.model('friendchats',friendchat_schema)
   let  group_schema= mongoose.Schema({sender:String,reciever:String,message:String})
   const group  = mongoose.model('friendchat',group_schema)
   let  create_schema= mongoose.Schema({creator:String,groupname:String,discription:String})
   const create = mongoose.model('chatmes', create_schema)
  

const io = require('socket.io')(server);
io.on("connection", (socket) => {
  socket.on("users",(data)=>{
    chatModel.find((err,users)=>{
    socket.emit("all users",users)
 })
    // groupjoins.find({first:data.first},(err,response)=>{
    //   socket.emit("all friends",response)
    // })
  })
  socket.on("friend",(data)=>{
    groupjoins.find({first:data.user},(err,users)=>{
    socket.emit("friends",users)
 })
})
  socket.on("add",(data)=>{
    groupjoins.findOne({first:data.first,second:data.second},(err,response)=>{
       if (!err && response) {
         socket.emit('added friend',{user:response.second, message:"is your friend already"})
       }
       else if(!err && !response){
         const friend =  new  groupjoins({
          first:data.first,
          second:data.second
          })
          friend.save();
          socket.emit('added',{user:data.second, message:"has successfully add to your friend"})        
       }
    })
    // chatModel.find({$or:[{firstname: data.first,},{firstname:data.second}]},(err,user)=>{console.log(user) })

})
 socket.on('join',(data)=>{
   socket.join(data.room);
   socket.broadcast.to(data.room)
   .emit('new user joined',{user:data.user,message:'has joined the group'})
   })
 socket.on('left',(data)=>{
  socket.broadcast.to(data.room).emit('left room',{user:data.user,message:' has left this group'});
   socket.leave(data.room);
})
   socket.on ('message on',async(data)=>{
   await io.in(data.room,
   chat.find({room:data.room},async(err,result)=>{
     if(err) throw err;
     socket.emit('displaymessage',result)
      }))
    })
    socket.on('message',(data)=>{
      chatModel.findOne({firstname:data.user},(err,result)=>{
      io.in(data.room).emit('new message',{user:data.user,message:data.message,image:result.image,room:data.room})  
      let message = new chat({user:data.user,room:data.room,message:data.message,image:result.image})
      message.save()
    })
})
socket.on('friendmessage',(data)=>{
  // console.log(data) 
  io.in(data.sender).emit('sender friendmessage',{user:data.sender,message: data.message,})
  socket.broadcast.to(data.reciever).emit('new friendmessage',{user:data.sender,message: data.message})
 if (data) {
   
 }
  // let friendmessage = new friendchat({
  //    sender:data.sender,
  //    reciever:data.reciever,
  //    message:data.message
  // })
  // friendmessage.save()

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
  // {$or:[{firstname: data.first,},{firstname:data.second}]}
    friendchat.find({$or:[{sender:data.sender,reciever:data.reciever},{sender:data.reciever,reciever:data.sender}]},(err,result)=>{
       console.log(result)
      if(err) throw err;
       socket.emit('displayfriendmessage',result)
       })
      })
      socket.on('signup',(data)=>{
        var genderFerify;
        if(data.gender=='male'){
          genderFerify ='/assets/images/no-photo.jpg';
        }else if(data.gender=="female"){
          genderFerify ='/assets/images/Girl.jpg';
        }
    let register = new chatModel({
    firstname:data.firstname,
    lastname:data.lastname,
    email:data.email,
    password:data.password,
    phone:data.phone,
    gender:data.genger,
    image:genderFerify,
  })
  register.save();
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
    if (result){ 
      // console.log(result)
      socket.emit('new login',{result})
    }
  })
  })
  socket.on('fetchdata',(data)=>{
    chatModel.findOne({firstname:data},(err,result)=>{
      if (result){ 
        // console.log(result)
        socket.emit('new data',{result})
      }
    })
    })
  socket.on('create',(data)=>{
    let creategroup = new create({
      creator:data.user,
      groupname:data.groupname,
      discription:data.discription
    })
     creategroup.save();
    // socket.broadcast.to(res).emit('create group',{message:'You invited to a group by '+ data.user})

  })   
  socket.on('profileImage',(data)=>{
    console.log(data)
  socket.emit('new profileImage',{image:data.image})
  var newImage = { $set: {image:data.image}};
  chatModel.updateOne({firstname:data.username},newImage,(err,result)=>{
    if (result){ 
      console.log(result)
      // socket.emit('new login',{result})
    }
  })
  chat.updateMany({user:data.username},newImage,(err,result)=>{
    if (result){ 
      console.log(result)
      // socket.emit('new login',{result})
    }
  })

  // chatModel.update({firstname:data},newImage);

})

})
  app.post('/file',uploads.single('file'),(req,res,next)=>{
    const file = req.file;
    res.send(file);
    // var filed = file.path
    // var filler =filed.slice(16);
    // console.log(filler);
  })
  