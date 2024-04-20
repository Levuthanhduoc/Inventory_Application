const asyncHandler =require('express-async-handler');
const User = require('../models/user');
const { body, validationResult } = require("express-validator");
const user = require('../models/user');

exports.login_page = asyncHandler(async(req,res,next)=>{
    res.render("login",{title:"LOGIN"})
})

exports.login = asyncHandler(async(req,res,next)=>{
    const user = await User.find({user:req.body.user});
    const date = new Date;
    if(user.length !== 0){
        date.setTime(date.getTime() + 24 * 60 * 60 *1000)
        const id = user[0]._id;
        res.cookie('user',id.toString(),date.toUTCString())
        res.redirect('/')
    }else{
        res.render("login",{message:"Incorrect password or username "});
    }  
})

exports.sign_up_page = asyncHandler(async(req,res,next)=>{
    res.render("sign_up",{
        title:"SiGN UP",
    })
})

exports.sign_up = [(req,res,next)=>{
        console.log("aaaaaaa");
        next();
    },
    body("name","name must be longer than 4")
    .trim().isLength({min:4}).escape(),
    body("password","password must longer than 12 character")
    .trim().isLength({min:8}).matches(/^(?=.*[A-Za-z])(?=.*[\d])[A-Za-z\d]{8,}$/gm).escape(),
    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req);
        const user_find = await User.find({user:req.body.user});
        if(errors.isEmpty()){
            if(user_find){
                res.render("sign_up",{
                    title:"SIGN UP",
                    message:[{msg:"user already exist, please choose different name"}],
                    name:req.body.name,
                    password:req.body.password,
                });
            }else{
                const newUser = new User({name:req.body.name,password:req.body.password})
            await newUser.save();
            res.render("login",{message:"Create User success, please login"});
            }   
        }else{
            res.render("sign_up",{
                title:"SIGN UP",
                message:errors.errors,
                name:req.body.name,
                password:req.body.password,
            });
        }
    
})]

exports.delete = asyncHandler(async (req,res,next)=>{
    const user = await User.find({user:req.body.user});
    const date = new Date;
    if(user){
        await User.findByIdAndDelete(user._id)
        res.cookie('user',user._id,date.toUTCString())
        res.redirect('/')
    } 
})