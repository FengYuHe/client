$(function(){
	$('#client').click(function(){
		var data = {};
		data.text = $('#text').val();
		console.log(data);
		data = JSON.stringify(data);
		$.ajax({
			type : "POST",
			contentType: "application/json",
            url: "/api",
            data : data,
            cache : false,
            async : false,
            success : function(res){
            	console.log(res);
            }
		})
	});

	$('#activate').click(function(){
		$.ajax({
			type : "GET",
			timeout: 20000,
			contentType: "application/json",
            url: "http://localhost:3000",
            cache : false,
            async : false,
            headers : {"Access-Control-Allow-Origin": "*"},
            success : function(res){
            	alert('success');
            },
            error : function(res){
            	console.log(res);
		　　　	alert("超时");
		　　}
		})
	})
})