const mongoose = require ('mongoose');

const expenseSchema = mongoose.Schema({
    name:String,
    date:Date,
    amount:Number,
    user_id:String,

},{timestamps : true})

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = {Expense}