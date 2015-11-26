var express = require('express');
var router = express.Router();
var _ = require('lodash');
var request = require("request");
var config = require('./../config.js');
var mqtt    = require('mqtt');
var service = require('./service');

var token = require('./fs').getToken();
var client  = mqtt.connect(config.mqtt,{username: token});

service.getPushChannel().then(function(channelId){
	service.getDevice().then(function(device){
		console.log(device);
		_(device).forEach(function(deviceId){
			client.subscribe('$cloud/device/'+deviceId+'/channel/'+channelId)
		}).value();
	})
})


client.on('close',function(){
	console.log('**************************');
	console.log('close the subscribe');
	console.log('**************************');
})

client.on('message', function (topic, message) {
	console.log('==========================');
	console.log(message.toString());
	console.log('==========================');
});

router.post('/device',function(req, res){
	client.publish('$cloud/device/'+req.body.deviceId+'/channel/'+req.body.channelId+'/event/state', JSON.stringify(req.body.pushMessage));
	res.json({statusCode:1});
});

module.exports = router;