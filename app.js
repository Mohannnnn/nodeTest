var http = require('http');
var url = require('url');
var util = require('util');//用于获取get请求
var querystring = require('querystring');//用于获取post请求
// var main = require('./main.js');
function start() {
	//get请求
	function onRequest(request , response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		response.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
		response.write("Hello World");
		response.end(util.inspect(url.parse(request.url, true)));
	}

	http.createServer(onRequest).listen(3000);

	//post请求
	function postRequest(req, res){
	    var post = '';     //定义了一个post变量，用于暂存请求体的信息

	    req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
	        post += chunk;
	    });

	    req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
	        post = querystring.parse(post);
	        res.end(util.inspect(post));
	    });
	}
	
	// http.createServer(postRequest).listen(3000);
}
start();
module.exports = start ;


// http.createServer(function(request,response){

//     res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});

//     res.end("hello world\n");

// }).listen(process.env.PORT || 3000);


//PS：此处用于搭建服务器
