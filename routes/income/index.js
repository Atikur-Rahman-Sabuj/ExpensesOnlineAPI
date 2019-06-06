const income = require('express').Router();
const {Income} = require('../../models/income')

//get
income.get('/', (req,res)=>{
    Income.find((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(doc);
    })
});



module.exports = income; 