//路由：我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
//      在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。

var express = require('express');
var app = express();

//  主页输出 "Hello World" localhost:3000为主页
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})


//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.delete('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/process_get', function (req, res) {
   console.log("/process_get GET 请求");

   response = {
   		first_name :req.query.first_name,
   		last_name  :req.query.last_name
   };

   res.send(JSON.stringify(response));
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})


var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})