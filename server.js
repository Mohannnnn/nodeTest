var http = require('http');
var url  = require('url');
var fs   = require('fs');
var iconv = require('iconv-lite');

function urlRequest (request , response) {
	 // 解析请求，包括文件名
	var pathname = url.parse(request.url).pathname;

	// 输出请求的文件名
   console.log("Request for " + pathname + " received.");

    // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1) , function (err , data) {
   		if(err) {
   			console.log(err);
   			//状态码404
   			response.writeHead(404 , {'Content-Type' : 'text/html;charset=utf-8'})
   		} else {
   			// HTTP 状态码: 200 : OK
   			response.writeHead(200 , {'Content-Type' : 'text/html;charset=utf-8'});

   			//var buf = new Buffer(data, 'binary');
			// var data = iconv.decode(buf, 'GBK')
			 // 响应文件内容
   			response.write(data.toString());//将请求的html发送给客户端
   		}
   		//  发送响应数据
   		response.end('发送的数据');
   });
}

http.createServer(urlRequest).listen(3000);
console.log('Server running');

//PS:http.createServer用于搭建服务器