const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MeatShema = new Schema({
    name:{type:String,required:true,maxlenght:100},
    type:{type:Schema.Types.ObjectId,ref:"Type",required:true},
    store:{type:Schema.Types.ObjectId,ref:"Store",require:true},
    price:{type:Number,required:true,max:10000,min:0},
    size:[{type:Number,required:true,max:10000,min:0}],
    description:{type:String,required:true,maxlenght:10000},
    status:{
        type:String,
        require:true,
        emu:["Available","Unavailable","Coming soon"],
        default:"Unavailable",
    }
})

//virtual for meat url
MeatShema.virtual("url").get(function(){
    return `/catalog/meat/${this._id}`
})

module.exports = mongoose.model("Meat",MeatShema);