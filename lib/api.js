var express = require('express');
var router = express.Router();
var PUBSUB = require('./pubsub');
var pubsub = new PUBSUB();

pubsub.subscribe('pullDevice',function(err,m){
	console.log(m);
})

router.post('/',function(req, res){
	var msg = req.body;
	console.log(msg);
	pubsub.publish('device', msg, function(e){
		console.log(e);
		res.end();
	})
})

module.exports = router;