var express = require ('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var formidable=require('formidable');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var data =[{item:'milk'},{item:'orange'},{item:'yam'}]

app.get('/',function(req,res){
    res.render('index',{qs:req.query})
});
app.post('/',urlencodedParser,function(req,res){
    console.log(req.body)
    // var rd=createReadStream(__dirname + )
res.render('index',{data:req.body})
})
app.get('/contact',function(req,res){
    res.render('contact',{qs:req.query})
})

app.post('/contact',urlencodedParser,function(req,res){
    res.render('contact-success', {data:data})
    // let form=new formidable.IncomingForm();
    // form.parse(req,(err,field,files)=>{
    //         let data ={
    //                  who:field.who,
    //                  department:field.department,
    //                  email:field.email,
    //             }
    //             let file_name=file.photo.name;
    //             let file_type=files.photo.type == "image/jpeg" ? '.jpg' : '.png';
    //             var perm = 'C:/nodeclass/public/upload' + file_name + file_type;
    //   fs.rename(file_path,perm,(err)=>{
    //                     if(err){
    //           console.log(err)
    //      }else{
    //      data.photo ='/upload' + files.who + file_type;
    //     }
    //   })
    //  })
                        
    //   res.render('contact-success',{data:req.body})
                        
    })
                    
var data = {age:25,job:'programmer',hobies:['eating','sleeping','fighting']}
app.get('/profile/:name',function(req,res){
    res.render('profile', {person:req.params.name,data:data})
})
app.get('/contact',function(req,res){
    res.sendFile(__dirname + '/contact.html')
})
app.listen(8200)