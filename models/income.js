const mongoose = require ('mongoose');

const incomeSchema = mongoose.Schema({
    name:String,
    date:Date,
    amount:Number,
    user_id:String,

},{timestamps : true})

const Income = mongoose.model('Income', incomeSchema);
module.exports = {Income}