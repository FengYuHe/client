var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var config = require('./../config.js');
var mqtt    = require('mqtt');

router.post('/device',function(req, res){
	fs.readFile('public/fs/nodeToken.txt', 'utf-8', function(err,data){
		if (err) {console.log(err)};
		var data = JSON.parse(data);
		var client  = mqtt.connect(config.mqtt,{username: data.data.token});
		client.publish('$cloud/device/'+req.body.deviceId+'/channel/'+req.body.channelId+'/event/state', JSON.stringify(req.body.pushMessage));
	})
	res.end();
});

module.exports = router;