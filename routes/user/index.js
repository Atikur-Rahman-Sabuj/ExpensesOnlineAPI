const user = require('express').Router();
const {User} = require('../../models/user')
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
//initializations
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sabuj.probook@gmail.com',
      pass: 'unlock853program'
    }
  });


//get
user.get('/', (req,res)=>{
    User.find((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc);
    })
});
user.get('/getone',(req,res)=>{
    User.findOne({email:req.query.email})
})
user.get('/login',(req,res)=>{
    User.findOne({email:req.query.email},(err,doc)=>{
        if(err) res.status(400).send(error)
        if(!doc){
            res.status(202).send({})
        }else{
            doc.comparePassword(req.query.password,(err,ismatch)=>{
                if(err) res.status(400).send(error)
                if(ismatch){
                    res.status(200).send(doc)
                }else{
                    res.status(204).send({})
                }
            })
        }

    })
})

//post
user.post('/register',(req,res)=>{
    console.log(req.body);
    
    let newUser = new User(req.body);
    newUser.code = randomstring.generate({
        length: 6,
        charset: 'numeric'
        });
    //SendMailNewCode(newUser.code, req.body.email);
    newUser.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc);
    })
})

user.post('/verifyemail',(req,res)=>{
    User.findOne({_id:req.query._id},(err,user)=>{
        if(err) return res.status(400).send({success:false, error:err})
        if(user.code==req.query.code){
            user.verified=true;
            user.save((err,nuser)=>{
                if(err) res.status(400).send({success:false, error:err})
                res.status(200).send({success:true, match:true})
            })
        }else{
            res.status(200).send({success:true, match:false})
        }
    })
})

user.post('/changepasswordcode',(req,res)=>{
    User.findOne({email:req.query.email},(err,user)=>{
        if(err) return res.status(200).send({success:false, error:err})
        if(!user){
            res.status(200).send({success:true, found:false});
        }else{
            user.code = randomstring.generate({
                length: 6,
                charset: 'numeric'
                });
            //SendMailNewCode(user.code, req.query.email);
            user.save((err,doc)=>{
                if(err) return res.status(400).send({success:false, error:err})
                res.status(200).send({success:true, found:true});
            })
        }
        
    })
})
user.post('/changepassword',(req,res)=>{
    User.findOne({email:req.query.email},(err,user)=>{
        if(err) return res.status(200).send({success:false, error:true})
        if(!user){
            res.status(200).send({success:false, found:false, error:false});
        }else{
            if(user.code==req.query.code){
                user.password = req.query.password;
                user.save((err,doc)=>{
                    if(err) return res.status(400).send({success:false, error:true})
                    res.status(200).send({success:true, found:true, error:false, user:doc});
                })
            }
            
        }
        
    })
})


//functions
const SendMailNewCode=(code, mailId)=>{
    let msg = "Your verification code is: "+code;
    var mailOptions = {
        from: 'sabuj.probook@gmail.com',
        to: mailId,
        subject: 'Email verification',
        text: msg
      };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}


module.exports = user; 