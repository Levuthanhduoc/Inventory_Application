const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TypeShema =new Schema({
    name:{type:String,require:true,maxLenght:100}
})

TypeShema.virtual("url").get(function(){
    return `/catalog/type/${this._id}`;
})

module.exports = mongoose.model("Type",TypeShema);