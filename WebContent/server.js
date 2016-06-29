var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url');
var path = require('path');
global_array =[];
global_paths=[];
global_text=[];
global_move={};

//session=Math.floor(Math.random()*90000) + 10000;


var ip = process.env.OPENSHIFT_NODEJS_IP  || 'localhost';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;


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


var outgoingEmits = [];
(function() {
    var oldEmit = io.emit;
    io.emit = function(msg, data) {
        outgoingEmits.push({msg: msg, data: data});
				//console.log(msg);
        return oldEmit.apply(this, arguments);
    };
})();


	io.on('connection', function(socket){
		socket.on('event', function(data){
			console.log('connection established');
			socket.emit('initialize array', global_array,global_move);
			socket.emit('initialize path', global_paths);
				socket.emit('initialize text', global_text);
	      socket.emit('initialize move', global_move);
				//console.log(global_paths);
		});
		socket.on('change', function(data){
			socket.broadcast.emit('change', data);
			global_array.push(data);
			//console.log(data);

		});


		socket.on('new', function(data){
				socket.emit('initialize path', global_paths);

		});


		socket.on('move', function(data){
			socket.broadcast.emit('move', data);

		});
		socket.on('update redraw', function(data){
			if(global_paths[data.location]!=undefined)
global_paths[data.location].d=data.d;

		});

		socket.on('make-path', function(msg){
	     socket.broadcast.emit('make-path', msg);
			 //console.log(msg);
			 	global_paths.push(msg);
				//console.log(global_paths);
					//socket.emit('initialize path array', global_paths,rdata.id,rdata.x,rdata.y);


	   });
socket.on('redraw',function(rdata){
	socket.emit('initialize path array', global_paths,rdata.id,rdata.x,rdata.y);

});

socket.on('initialize move',function(data){
	var id=data.id;
				global_move[id]={id:data.id,d:data.d,x:data.x,y:data.y};
	//console.log(global_move);

});




		socket.on('mousedown', function (data) {
			socket.broadcast.emit('mousedown', data);
			//console.log(data);
		});

		socket.on('clear', function () {

			global_move={};
			global_array=[];
			global_text=[];
			global_paths=[];
			global_obj={};
			socket.emit('initialize array', global_array);
			socket.emit('initialize path', global_paths);
				socket.emit('initialize text', global_text);
	      socket.emit('initialize move', global_move);
				console.log("clear");
			//console.log(data);
		});


		socket.on('text-change', function(data){
			socket.broadcast.emit('text-change', data);
				//global_array.push(data);
				global_text.push(data);

		})
	});
