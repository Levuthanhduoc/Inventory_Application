const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name:{type:String,required:true,maxLenght:100},
    location:{type:String,required:true,maxLenght:100},
})

StoreSchema.virtual("url").get(function(){
    return `/catalog/store/${this._id}`
})

module.exports = mongoose.model("Store",StoreSchema);