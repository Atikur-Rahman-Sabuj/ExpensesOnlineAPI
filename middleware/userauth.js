const {User} = require('../models/user');


let userauth = (req,res,next) =>{
    let token = req.query.userauth;


    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        //console.log(client);
        if(!user) return res.json({
            isAuth:false,
            success:true
        });

        req.token = token;
        req.client = client
        next();
    })

}

module.exports = {userauth}