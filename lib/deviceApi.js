var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var config = require('./../config.js');
var mqtt    = require('mqtt');
var isSubscribe =true;

router.post('/device',function(req, res){
	fs.readFile('public/fs/nodeToken.txt', 'utf-8', function(err,data){
		if (err) {console.log(err)};
		var data = JSON.parse(data);
		var client  = mqtt.connect(config.mqtt,{username: data.data.token});
		client.publish('$cloud/device/'+req.body.deviceId+'/channel/'+req.body.channelId+'/event/state', JSON.stringify(req.body.pushMessage));

		var url = 'http://localhost:6001/rest/v1/user/getPushChannel?access_token='+config.token;
		if(isSubscribe){
			request.get(url,function(err, result){
				if(err) console.log(err);
				result = JSON.parse(result.body);
				isSubscribe = false;
				client.subscribe('$cloud/device/'+req.body.deviceId+'/channel/'+result.data.pushSettings.channel)
			})
		}

		client.on('close',function(){
			console.log('**************************');
			console.log('close the subscribe');
			isSubscribe = true;
			console.log('**************************');
		})

		client.on('message', function (topic, message) {
		  console.log('========================');
		  console.log(message.toString());
		  console.log('========================');
		});
	})
	res.end();
});

module.exports = router;