const income = require('express').Router();
const {Income} = require('../../models/income')
//get
income.get('/', (req,res)=>{
    Income.find({user_id:req.query.user_id},(err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc);
    })
});
income.get('/bydate',(req,res)=>{
    Income.find({date:req.query.date,user_id:req.query.user_id},(err,doc)=>{
        if(err) return res.status(400).send({success:false,error:true})
        res.status(200).send(doc)
    })
})
income.get('/byid',(req,res)=>{
    Income.findById(req.query._id,(err,doc)=>{
        if(err) return res.status(400).send({success:false,error:this.trace})
        //if(!doc) return res.status(200).send({success:false,found:true})
        res.status(200).send(doc)
    })
})
//post
income.post('/', (req,res)=>{
    let newIncome = new Income(req.body)
    newIncome.save((err,doc)=>{
        if(err) return res.status(400).send({success:false, error:true})
        res.status(200).send(doc)
    })
})
income.post('/update',(req,res)=>{
    Income.updateOne({_id:req.body._id},{$set:{amount:req.body.amount,name:req.body.name}},{upsert:false,},(err,doc)=>{
        if(err) return res.status(400).send({success:false, error:true})
        //if(!doc)res.status(200).send({success:false,found:false})
        res.status(200).send(income)
    })
})
income.post('/deletebyid',(req,res)=>{
    Income.findByIdAndDelete(req.query._id,(err,doc)=>{
        if(err) res.status(400).send({success:false, error:true})
        res.status(200).send(doc)
    })
})


module.exports = income; 