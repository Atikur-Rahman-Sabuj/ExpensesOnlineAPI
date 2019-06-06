const expense = require('express').Router();
const {Expense} = require('../../models/expense')

//get
expense.get('/', (req,res)=>{
    Expense.find((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc);
    })
});
//post
expense.post('/', (req,res)=>{
    let newExpense = new Expense({
        name:req.query.name
    })
    newExpense.save((err,doc)=>{
        if(err) return res.status(400).send({success:false, error:err})
        res.status(200).send({success:true, expense:doc})
    })
})

module.exports = expense; 