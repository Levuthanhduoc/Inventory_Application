var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog');
});

router.get("/javascripts/:name",(req,res,next)=>{
  res.sendFile(`../javascripts/${req.params.name}`)
})

module.exports = router;
