const asyncHandler =require('express-async-handler');
const Meat = require("../models/meat");

exports.show_Store = asyncHandler(async (req,res,next)=>{
    const allMeat = await Meat.find({type},"name price").limit(10).exec();

    res.render("store_All",{meat:allMeat});
})