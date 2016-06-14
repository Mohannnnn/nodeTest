
var http = require('http');
var net  = require('net');

var options = {
	host: 'localhost',
	port: '3000',
	path: './index.html'
}
var callback = function(response){
   // 不断更新数据
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // 数据接收完成
      console.log(body);
   });
}
// 向服务端发送请求
var req = http.request(options, callback);
req.end();