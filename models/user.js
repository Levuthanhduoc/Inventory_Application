const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserShema = new Schema({
    name:{type:String,require:true,maxLenght:100},
    password:{type:String,require:true,minlenght:8}
})

module.exports = mongoose.model('User',UserShema);