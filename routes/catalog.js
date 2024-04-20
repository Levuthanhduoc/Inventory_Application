var express = require('express');
var router = express.Router();

const meat_controller = require("../controllers/meatController");
const store_controller =require("../controllers/storeController");
const type_controller = require("../controllers/typeController");
const user_controller = require("../controllers/userController")
const { route } = require('.');

//Home show all type of meat

router.get("/",type_controller.home);

//login
router.get("/login",user_controller.login_page);
router.post("/login",user_controller.login);

//
router.get("/signup",user_controller.sign_up_page);
router.post("/signup",user_controller.sign_up);
//Meat

router.get("/type/:id",meat_controller.show_Meat);

router.get("/meat/:id",meat_controller.show_Meat_detail);

module.exports = router;

