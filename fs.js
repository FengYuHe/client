var fs = require('fs');

var readFile =function(){
	
};

readFile.getToken = function(){
	var node = fs.readFileSync('../public/fs/nodeToken.txt','utf-8');
	node = JSON.parse(node);
	return node.data.token;
};

module.exports = readFile;
