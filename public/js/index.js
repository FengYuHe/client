$(function(){
	var getListNode = function(){
		var data = {};
		data.option = "getListNode";
		data = JSON.stringify(data);
		$.ajax({
      		type : "POST",
      		contentType: "application/json",
                  url: "/api/activate",
                  data : data,
                  cache : false,
                  async : false,
                  success : function(res){
                  	console.log(res);
                  }
		})
	}

	getListNode();

	$('#activate').click(function(){
		var data = {};
		data.option = "activate";
		data.nodeId = $('#text').val();
		data = JSON.stringify(data);
		$.ajax({
      		type : "POST",
      		contentType: "application/json",
                  url: "/api/activate",
                  data : data,
                  cache : false,
                  async : false,
                  success : function(res){
                  	if(res.statusCode===0){
                  		alert("请求超时！");
                  	}else if(res.statusCode===-1){
                  		alert("请求出错！");
                  	}else{
                  		console.log(res);
                  		alert("激活成功！");
                  	}
                  }
		})
	});

      $('#announceDevice').click(function(){
            var data = {};
            data.option = "announce";
            data.announceType = "device";
            data = JSON.stringify(data);
            $.ajax({
                  type : "POST",
                  contentType: "application/json",
                  url: "/api/activate",
                  data : data,
                  cache : false,
                  async : false,
                  success : function(res){
                        if(res.statusCode===1){
                              alert("宣告设备成功！");
                        }else{
                              alert("宣告设备失败！");
                        }
                  }
            })
      });

      $('#announceChannel').click(function(){
            var data = {};
            data.option = "announce";
            data.announceType = "channel";
            data = JSON.stringify(data);
            $.ajax({
                  type : "POST",
                  contentType: "application/json",
                  url: "/api/activate",
                  data : data,
                  cache : false,
                  async : false,
                  success : function(res){
                        if(res.statusCode===1){
                              alert("宣告功能成功！");
                        }else{
                              alert("宣告功能失败！");
                        }
                  }
            })
      });
})