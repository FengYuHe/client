var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.render('index',{});
});

router.get('/device',function(req,res){
    res.render('device',{});
})

module.exports = router;