//阻塞式代码
var fs = require('fs');//文件读取模块
var iconv = require('iconv-lite');

var data = fs.readFileSync('input.txt');//同步读取文件，也可异步
var buf = new Buffer(data, 'binary');//binary：二进制
var str = iconv.decode(buf, 'GBK')
console.log(str.toString());
console.log('结束');

//非阻塞式代码，使用回调函数，异步执行
var fs = require('fs');
var iconv = require('iconv-lite');//node不支持中文编码,需要转换

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);

    var buf = new Buffer(data, 'binary');
	var str = iconv.decode(buf, 'GBK')
    console.log(str.toString());
});
console.log("程序执行结束!");

/* 
Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件，
一个fs.readStream对象会在文件被打开的时候发出一个事件
所有产生这些事件的对象都是 events.EventEmitter 的实例，
1.EventEmitter 支持若干个事件监听器(包括；多个一样的事件)
2.on(event, listener)为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
3.once(event, listener)为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。
4.removeListener(event, listener)移除指定事件的某个监听器，监听器 必须是该事件已经注册过的监听器。
5.emit(event, [arg1], [arg2], [...])按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
6.listenerCount(emitter, event)返回指定事件的监听器数量,emitter是创建的事件对象。
*/
//事件
var events = require('events');

var eventEmitter = new events.EventEmitter();
var connectHandler = function connected (arg) {
	console.log('连接成功'+arg);
	eventEmitter.emit('data_received');
};
eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received' , function () {
	console.log('数据接收成功');
});
eventEmitter.on('data_received' , function () {
	console.log('数据接收成功');
});

eventEmitter.emit('connection' , '12');

console.log('完毕');

/*
1.从缓冲区读取数据 buf.toString([encoding[, start[, end]]])
2.将 Buffer 转换为 JSON 对象 buf.toJSON()
3.缓冲区合并 Buffer.concat(list[, totalLength])
4.缓冲区比较 buf.compare(otherBuffer);
5.拷贝缓冲区 buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
6.缓冲区裁剪 buf.slice([start[, end]])
7.缓冲区长度 buf.length;
8.写入缓冲区 buf.write(string[, offset[, length]][, encoding])
*/
//buffer(缓冲区)
var buf = new Buffer(26);

for (var i = 0; i < 26; i++) {
	buf[i] = i+97;
}
console.log(buf.toString('ascii' , 0 ,5));//读数据

var json = buf.toJSON();//将Node Buffer转化为JSON对象
console.log(json);

var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());//缓冲区合并

/*
1.创建可读流
2.创建写入流
3.管道流，用于从一个流中获取数据并将数据传递到另外一个流中
4.链式流，链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
*/
//Nodejs Stream(流)
var fs = require("fs");
var data = '';

//1. 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('utf-8');

// 处理流事件 --> data, end and error  
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");

//2.创建写入流
var fs = require("fs");
var data = '我是output文件';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");

//3.管道流
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output1.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output1.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");

//4.链式流 接下来我们就是用管道和链式来压缩和解压文件
// 压缩
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");

//解压
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");


/*
1.nodejs全局对象为global,而浏览器js中指的是window
*/

/*
nodejs常用工具
1.util 是一个Node.js 核心模块，提供常用函数的集合
2.util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
3.util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象
4.util.isArray(object) 一个数组返回true，否则返回false
5.util.isRegExp(object) 一个正则表达式返回true，否则返回false
6.util.isDate(object) 如果给定的参数 "object" 是一个日期返回true，否则返回false。
7.7.util.isError(object) 如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
*/
//2.util.inherits(constructor, superConstructor)
var util = require('util'); 

function Base() { 
	this.name = 'base'; 
	this.base = 1991; 
	this.sayHello = function() { 
	console.log('Hello ' + this.name); 
	}; 
} 
Base.prototype.showName = function() { 
	console.log(this.name);
}; 
function Sub() { 
	this.name = 'sub'; 
} 
util.inherits(Sub, Base);
var objBase = new Base(); 
objBase.showName(); //base
objBase.sayHello(); //Hello base
console.log(objBase); //{ name: 'base', base: 1991, sayHello: [Function] }

var objSub = new Sub(); 
objSub.showName(); //sub
//objSub.sayHello(); //undefined
console.log(objSub); //{ name: 'sub' }
//注意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。

//3.util.inspect(object,[showHidden],[depth],[colors])
var util = require('util'); 
function Person() { 
	this.name = 'byvoid'; 
	this.toString = function() { 
	return this.name; 
	}; 
} 
var obj = new Person(); 
console.log(util.inspect(obj)); 
console.log(util.inspect(obj, true));//如果为ture参数，则会显示更多的信息

//4.util.isArray(object);
var util = require('util');

util.isArray([])
  // true
util.isArray(new Array)
  // true
util.isArray({})
  // false

//5.util.isRegExp(object)一个正则表达式返回true，否则返回false
var util = require('util');

util.isRegExp(/some regexp/)
  // true
util.isRegExp(new RegExp('another regexp'))
  // true
util.isRegExp({})
  // false

//6.util.isDate(object) 如果给定的参数 "object" 是一个日期返回true，否则返回false。
var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false

//7.util.isError(object) 如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
var util = require('util');

util.isError(new Error())
  // true
util.isError(new TypeError())
  // true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false

/*
nodejs文件系统
1.读取文件，异步的 fs.readFile() 和同步的 fs.readFileSync()。
2.打开文件 fs.open(path, flags[, mode], callback) flags为打开文件的行为
3.获取文件信息 fs.stat(path, callback)
4.写入文件 fs.writeFile(filename, data[, options], callback)

*/
//1.读取文件
var fs = require("fs");

// 异步读取
fs.readFile('input.txt', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("异步读取: " + data.toString());
});

// 同步读取
var data = fs.readFileSync('input.txt');
console.log("同步读取: " + data.toString());

console.log("程序执行完毕。");

//2.打开文件
var fs = require("fs");

// 异步打开文件
console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
       return console.error(err);
   }
  console.log("文件打开成功！");     
});

//3.获取文件信息 
var fs = require("fs");

console.log("准备打开文件！");
fs.stat('input.txt', function (err, stats) {//stats 是 fs.Stats 对象
   if (err) {
       return console.error(err);
   }
   console.log(stats);
   console.log("读取文件信息成功！");
   
   // 检测文件类型
   console.log("是否为文件(isFile) ? " + stats.isFile());
   console.log("是否为目录(isDirectory) ? " + stats.isDirectory());    
});
// stats.isFile()	如果是文件返回 true，否则返回 false。
// stats.isDirectory()	如果是目录返回 true，否则返回 false。
// stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
// stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
// stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
// stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
// stats.isSocket()	如果是 Socket 返回 true，否则返回 false。

//4.写入文件
