var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url');
var path = require('path');

app.listen(3000);
console.log('Listening');

function handler(req,res){
	var ff = __dirname + url.parse(req.url).pathname;
	if(ff=='/' || ff==''){ff = '/index.html';}
	//console.log(ff);
	fs.readFile(ff,
			function(err, data){
				if(err){
					res.writeHead(500);
					return res.end('Error loading file.');
				}
			
		res.writeHead(200);
		res.end(data);
	});
	//console.log(url.parse(req.url).pathname);
}

io.on('connection', function(socket){
	socket.on('event', function(data){
		console.log('connection established');
	});
	socket.on('change', function(data){
		socket.broadcast.emit('change', data);
	});
	socket.on('move', function(data){
		socket.broadcast.emit('move', data);
	});
	socket.on('text-change', function(data){
		socket.broadcast.emit('text-change', data);
	})
});