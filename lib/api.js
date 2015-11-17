var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var config = require('./../config.js');
var mqtt    = require('mqtt');

router.post('/activate',function(req, res,next){
	var option = req.body.option || "";
	if(option){
		list[option](req,res,req.body);
	}
});

var list = {
	activate : function(req,res,msg){
		var url = 'http://localhost:6001/rest/v1/nodes/'+msg.nodeId+'/activate?access_token='+config.token;
		request.get(url,{timeout:25000},function(err,data){
			if(err){
				if(err.code==='ETIMEDOUT'){
					res.json({statusCode:0});
				}else{
					res.json({statusCode:-1});
				}
			}else{
				var msg = JSON.parse(data.body);
				res.json({statusCode:1,data:msg.data});
				fs.writeFile('public/fs/nodeToken.txt', JSON.stringify(msg), function(err){
					if(err) console.log(err);
					console.log("writeFile success!");
				})
			}
		})
	},
	getListNode : function(req,res,msg){
		var url = 'http://localhost:6001/rest/v1/nodes?access_token='+config.token;
		request.get(url,function(err,data){
			var msg = JSON.parse(data.body)
			res.json({data:msg.data});
		})
	},
	announce : function(req, res, msg) {
		fs.readFile('public/fs/nodeToken.txt', 'utf-8', function(err,data){
			if (err) {console.log(err)};
			var data = JSON.parse(data);
			var client  = mqtt.connect(config.mqtt,{username: data.data.token});
			if(msg.announceType === "device"){
				device(client);
			}else{
				channel(client)
			}
			client.on('message', function (topic, message) {
			  // message is Buffer
			  console.log(message.toString());
			  client.end();
			  res.json({statusCode:1});
			});
		})
	}
}

function device(client){
	client.on('connect', function () {
		client.subscribe('$cloud/device/123456789/event/announce');
		var device = {
			"owner": "448c1540-5ac0-11e5-be4d-1dbcb42a9fe6",
			"topic": "$device/123456789",
			"schema": "http://schema.dolink.co/service/device",
			"supportedMethods": null,
			"supportedEvents": [],
			"id": "123456789",
			"naturalId": "1",
			"naturalIdType": "hue",
			"name": "Broken",
			"thingId": "a7aad9c3-a813-11e4-8ab9-7c669d02a705",
			"signatures": {
				"manufacturer:productModelId": "LCT001",
				"dolink:manufacturer": "Phillips",
				"dolink:productName": "Hue",
				"dolink:productType": "Light",
				"dolink:thingType": "light"
			}
		};
		client.publish('$cloud/device/123456789/event/announce', JSON.stringify(device));
	})
};

function channel(client){
	client.on('connect', function () {
		client.subscribe('$cloud/device/123456789/channel/1/event/announce')
	 	var channel = {
		    "topic": "$device/123456789/channel/on-off",
		    "schema": "http://schema.dolink.co/protocol/on-off",
		    "supportedMethods": [
		      "set",
		      "toggle",
		      "turnOff",
		      "turnOn"
		    ],
		    "supportedEvents": [],
		    "id": "on-off",
		    "protocol": "on-off",
		    "deviceId": "123456789"
	 	}
		client.publish('$cloud/device/123456789/channel/1/event/announce', JSON.stringify(channel));
	})
}
module.exports = router;