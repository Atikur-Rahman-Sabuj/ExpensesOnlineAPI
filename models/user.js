const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config').get(process.env.NODE_ENV);
const SALT_I = 10;

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    verified:{
        type:Boolean,
        default:false,
    },
    code:String,
    password:String ,
    token:String

},{timestamps : true})

userSchema.pre('save',function(next){
    var client = this;

    if(client.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) {return next(err)};

            bcrypt.hash(client.password,salt,function(err,hash){
                if(err) {return next(err)};
                client.password = hash;
                next();
            })
        })
    } else {
        next()
    }
})



userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword, this.password, function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}


userSchema.methods.generateToken = function(cb){
    var client = this;
    var token = jwt.sign(client._id.toHexString(),config.SECRET);
    // var token = jwt.sign({
    //     data: client._id.toHexString()
    //   }, config.SECRET, { expiresIn: '72h' });
    client.token = token;
    client.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user  = this;

    jwt.verify(token,config.SECRET,function(err,decode){
        if(decode==undefined){
            cb(null, null)
        }else{
            user.findOne({"_id":decode.data},function(err,user){
                if(err) return cb(err);
                cb(null,user)
            })
        }
        
    })
}

const User = mongoose.model('User', userSchema);
module.exports = {User}