const asyncHandler =require('express-async-handler');
const Type = require('../models/type')

exports.home = asyncHandler(async (req,res,next)=>{
    const allType = await Type.find().exec();
    res.render("index",{title:"Meat Store",type:allType,
        onclick:"this.nextSibling.setAttribute('style','opacity:1')"
      })
})