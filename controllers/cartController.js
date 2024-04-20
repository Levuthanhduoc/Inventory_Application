const asyncHandler =require('express-async-handler');
const Meat = require("../models/meat");
const Type = require("../models/type");
const Store = require('../models/store');

exports.add = asyncHandler(async(req,res,next)=>{
    const item = await Meat.findById(req.params.id,"name price").exec()
    res.cookie("cart",`${req.params.id}`)
    res.render("")
})