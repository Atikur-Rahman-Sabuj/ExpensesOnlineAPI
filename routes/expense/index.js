const expense = require('express').Router();
const {Expense} = require('../../models/expense')

//get
expense.get('/', (req,res)=>{
    Expense.find({user_id:req.query.user_id},(err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc);
    })
});
expense.get('/bydate',(req,res)=>{
    Expense.find({date:req.query.date,user_id:req.query.user_id},(err,doc)=>{
        if(err) return res.status(400).send({success:false,error:true})
        res.status(200).send(doc)
    })
})
expense.get('/byid',(req,res)=>{
    Expense.findById(req.query._id,(err,doc)=>{
        if(err) return res.status(400).send({success:false,error:true})
        res.status(200).send(doc)
    })
})
//post
expense.post('/', (req,res)=>{
    let newExpense = new Expense(req.body)
    newExpense.save((err,doc)=>{
        if(err) return res.status(400).send({success:false, error:true})
        res.status(200).send(doc)
    })
})
expense.post('/update',(req,res)=>{
    Expense.updateOne({_id:req.body._id},{$set:{amount:req.body.amount,name:req.body.name}},{upsert:false,},(err,doc)=>{
        if(err) return res.status(400).send({success:false, error:true})
        //if(!doc)res.status(200).send({success:false,found:false})
        res.status(200).send(doc)
    })
})
expense.post('/deletebyid',(req,res)=>{
    Expense.findByIdAndDelete(req.query._id,(err,doc)=>{
        if(err) res.status(400).send({success:false, error:true})
        res.status(200).send(doc)
    })
})
module.exports = expense; 