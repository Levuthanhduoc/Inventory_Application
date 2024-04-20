const asyncHandler =require('express-async-handler');
const Meat = require("../models/meat");
const Type = require("../models/type");
const Store = require('../models/store');

exports.show_Meat = asyncHandler(async (req,res,next)=>{
    const allMeat = await Meat.find({type:req.params.id},"name price type").populate("type").limit(10).exec();
    res.render("meat_All",{meat:allMeat,title:allMeat[0].type.name});
})

exports.show_Meat_detail = asyncHandler(async (req,res,next)=>{
    const meat = await Meat.findById(req.params.id).populate("store").exec();

    res.render("meat_detail",{meat:meat})   
})