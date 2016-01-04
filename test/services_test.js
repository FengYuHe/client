var service = require('../lib/service');
var should = require('should');
var config = require('./../config.js');
var token = 'ntok-ba8b865e1049ae18a5c98ded230e33ca';
var request = require('request');

var getPushChannelUrl = config.serviceUrl +'/user/getUserInfo?access_token='+ token;
var getDeviceUrl = config.serviceUrl +'/devices?access_token='+token;

describe('service', function(){
	it('should be get the UserInfo', function(done){
		request.get(getPushChannelUrl, function(err, result){
			service.getPushChannel().then(function(res){
				console.log(result.body);
				var channel = JSON.parse(result.body).data.pushSettings.channel;
				console.log(res);
				(channel).should.be.eql(res);
				done();
			})
		})
	})
})
