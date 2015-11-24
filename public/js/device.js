$(function(){
	var pushMessage = '{ "jsonrpc" : "2.0", "method" : "display", "params" : [ { "title" : "没错，我是数据！"}], "id" : "1"}';
	$('#pushMessage').val(pushMessage);
	$('#publish').click(function(){
		var data = {};
		data.deviceId =$('#deviceId').val();
		data.channelId = $('#channelId').val();
		data.pushMessage = JSON.parse($('#pushMessage').val());
		data = JSON.stringify(data);
		$.ajax({
      		type : "POST",
      		contentType: "application/json",
			url: "/send/device",
			data : data,
			cache : false,
			async : false,
			success : function(res){
				console.log(res);
				alert('success');
			}
		})
	})
})