var express = require('express');
var router = express.Router();
var _ = require('lodash');
var request = require("request");
var config = require('./../config.js');
var mqtt    = require('mqtt');
var mqttRouter = require('mqtt-router');
var service = require('./service');

var token = 'ntok-ba8b865e1049ae18a5c98ded230e33ca';
var client  = mqtt.connect(config.mqtt,{username: token});
var mqtt_router = mqttRouter.wrap(client);

service.getPushChannel().then(function(channelId){
	mqtt_router.subscribe('$cloud/device/+:deviceId/channel/'+channelId);
});


client.on('close',function(){
	console.log('**************************');
	console.log('close the subscribe');
	console.log('**************************');
})

client.on('message', function (topic, message) {
	console.log('=====================================================');
	console.log(topic);
	console.log(message.toString());
	console.log('=====================================================');
});

router.post('/device',function(req, res){
	client.publish('$cloud/device/'+req.body.deviceId+'/channel/'+req.body.channelId+'/event/state', JSON.stringify(req.body.pushMessage));
	res.json({statusCode:1});
});

module.exports = router;