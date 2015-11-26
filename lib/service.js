var request = require("request");
var _ = require('lodash');
var config = require('./../config.js');
var token = require('./fs').getToken();

var getPushChannelUrl = config.serviceUrl +'/user/getPushChannel?access_token='+ token;
var getDeviceUrl = config.serviceUrl +'/devices?access_token='+token;

var service = function(){

};

service.getPushChannel = function(){
	return new Promise(function(resolve, reject){
		request.get(getPushChannelUrl,function(err, result){
			if(err) return reject(err);
			result = JSON.parse(result.body);
			return resolve(result.data.pushSettings.channel);
		})
	})
};

service.getDevice = function(){
	return new Promise(function(resolve, reject){
		request.get(getDeviceUrl,function(err, result){
			if(err) return reject(err);
			result = JSON.parse(result.body);
			return resolve(_.pluck(result.data, "id"));
		})
	})
};

module.exports = service;