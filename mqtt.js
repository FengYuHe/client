var mqtt    = require('mqtt');
//var client  = mqtt.connect({host: '127.0.0.1', port: 9000, username:'ntok-f72f188eadcc7b553fda4ffa604b8371'});
var client  = mqtt.connect('mqtt://127.0.0.1:9000',{username:'ntok-f72f188eadcc7b553fda4ffa604b8371'});

client.on('error',function(error){
	console.log(error);
})


client.on('close',function(error){
	console.log(error);
	console.log('=========');
})

console.log('-------------------------');
client.on('connect', function () {
 //  client.subscribe('$cloud/device/123456789/event/announce');
 //  var device = {
	//   "topic": "$device/123456789",
	//   "schema": "http://schema.dolink.co/service/device",
	//   "supportedMethods": null,
	//   "supportedEvents": [],
	//   "id": "123456789",
	//   "naturalId": "1",
	//   "naturalIdType": "hue",
	//   "name": "Broken",
	//   "thingId": "a7aad9c3-a813-11e4-8ab9-7c669d02a705",
	//   "signatures": {
	//     "manufacturer:productModelId": "LCT001",
	//     "dolink:manufacturer": "Phillips",
	//     "dolink:productName": "Hue",
	//     "dolink:productType": "Light",
	//     "dolink:thingType": "light"
	//   }
	// };
 //  client.publish('$cloud/device/123456789/event/announce', JSON.stringify(device));

 	client.subscribe('$cloud/device/123456789/channel/0246f876c755f96e3334a38a97dd9fe03e4a0ac9')
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
	client.publish('$cloud/device/123456789/channel/1/event/state', JSON.stringify(channel));

});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('========================');
  console.log(message.toString());
  client.end();
});