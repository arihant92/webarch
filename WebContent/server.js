var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url');
var path = require('path');
var mysql      = require('mysql');
var middleware = require('socketio-wildcard')();
io.use(middleware);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'webarch',
	multipleStatements: true,
});
connection.connect();
global_array =[];
global_paths=[];
global_text=[];
global_move={};
global_obj=[];
id='';

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


	io.sockets.on('connection', function(socket){
    socket.on('room', function(room) {
        socket.join(room);
        console.log(room);
        io.sockets.in(room).emit('testing', 'testing');

    });


  //io.sockets.in(room).emit('testing', 'what is going on, party people?');

		socket.on('event', function(data){
			//console.log(data);


			//console.log(io.sockets.sockets[0].id);
			socket.emit('initialize array', global_array,global_move);
			socket.emit('initialize path', global_paths);
				socket.emit('initialize text', global_text);
	      socket.emit('initialize move', global_move);
				//console.log(global_paths);
		});
		socket.on('change', function(data){
			socket.broadcast.emit('change', data);
			global_array.push(data);
      console.log(data);
			var DOMParser = require('xmldom').DOMParser;
      //var parser = new DOMParser();
			//console.log(data);
			var parser = new DOMParser();
			var doc = parser.parseFromString(data.obj, "image/svg+xml");
		  var type = doc.getElementsByTagName('svg')[0].getAttribute("data");
		  var x = doc.getElementsByTagName('svg')[0].getAttribute("x");
		  var y = doc.getElementsByTagName('svg')[0].getAttribute("y");
		  var id = doc.getElementsByTagName('svg')[0].getAttribute("id");
      var insert = {
				id:id,
				type:type,
				name:'test',
				x:x,
				y:y,
				session:data.session,
			};
			connection.query('insert into elements set ?',insert,function(err,result){
				if(err){console.error(err);return}
			});

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
      //console.log(data);

		});



		socket.on('make-path', function(msg){
	     socket.broadcast.emit('make-path', msg);
			 var insert ={
				 id:msg.id,
				 x1:msg.x1,
				 y1:msg.y1,
				 x2:msg.x2,
				 y2:msg.y2,
				 type:msg.path_type,
				 element_from:msg.from,
				 element_to:msg.to,
				 d:msg.d,
				 session:'',
				 name:'',
				 session:msg.session
			 }
			 connection.query('insert into relations set ?',insert,function(err,result){
			 	if(err){console.error(err);return}
			 });
			 	global_paths.push(msg);
				//console.log(global_paths);
					//socket.emit('initialize path array', global_paths,rdata.id,rdata.x,rdata.y);


	   });
socket.on('redraw',function(rdata){
	socket.emit('initialize path array', global_paths,rdata.id,rdata.x,rdata.y);

});





socket.on('initialize move',function(data){

	if(data.relation=='figure'){
	 id=data.id;
				global_move[id]={id:data.id,d:data.d,x:data.x,y:data.y};
	//console.log(global_move);
	connection.query('UPDATE elements SET x= ? , y=? WHERE id = ?',[data.x,data.y,data.id],function(err){
	if(err){console.error(err);}
});
}
else{
//element_to
if(data.relation=='to'){
var qtry= connection.query('UPDATE relations set x2 =?, y2=? WHERE element_to=?',[data.x2,data.y2,id],function(err,result){
	if(err){console.error(err);}else{moveRelations(id,'to')}
	//console.log(qtry);
});
}//if it is element_to
//console.log(query);
//element_from
if(data.relation=='from'){
 connection.query('UPDATE relations set x1 =?, y1=? WHERE element_from=?',[data.x1,data.y1,id],function(err,result){
	if(err){console.error(err);}
	else{moveRelations(id,'from')}
});
}
}
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
			global_obj=[];
			socket.emit('initialize array', global_array);
			socket.emit('initialize path', global_paths);
				socket.emit('initialize text', global_text);
	      socket.emit('initialize move', global_move);
				console.log("clear");
			//console.log(data);
		});

socket.on('persist',function(session){

	socket.emit('initialize array', global_array,global_move);
	socket.emit('initialize path', global_paths);
		socket.emit('initialize text', global_text);
		socket.emit('initialize move', global_move);

//GETTING ALL ELEMENTS
	connection.query('SELECT * FROM elements WHERE session = ?',session.session,function(err,rows){
	if(err)console.log(err);
for(var i=0; i<rows.length; i++){
socket.emit('persist elements',{id:rows[i].id,x:rows[i].x,y:rows[i].y,session:rows[i].session,name:rows[i].name,type:rows[i].type});

	 }//EOF for loop
 });//elements end

// GETTING ALL RELATIONS
var trying = connection.query('SELECT * FROM relations WHERE session =?',session.session,function(err,relations){
if(err)console.log(err);

for(var i=0; i<relations.length; i++){
socket.emit('persist relations',{id:relations[i].id,x1:relations[i].x1,y1:relations[i].y1,x2:relations[i].x2,y2:relations[i].y2,session:relations[i].session,name:relations[i].name,type:relations[i].type});

 }//EOF for loop
})//elements end
});//persist end

		socket.on('text-change', function(data){
			//console.log(data);

     if(data.coords.x!=0){
	 connection.query('UPDATE elements set name =? WHERE id=?',[data.text,data.id],function(err,result){
				if(err){console.error(err);}
				else{}
			});
		}
		else{
			console.log("updating relations");
		 connection.query('UPDATE relations set name =? WHERE id=?',[data.text,data.id],function(err,result){
				if(err){console.error(err);}
		});
	}//change relations path text
			socket.broadcast.emit('text-change', data);
				global_text.push(data);

		})



//function to change D value
function moveRelations(data,toorfrom){
	var where='';
	if(toorfrom=='to'){where='element_to'}else{where='element_from'}

var query= connection.query('SELECT id FROM relations WHERE '+where+'=?',data,function(err,getid){
	if(err){console.error(err);}
	else{
		var relation_id=getid[0].id;
   connection.query('SELECT * FROM relations WHERE id=?',relation_id,function(err,result){
			if(err){console.error(err);}

			else{
console.log(query);
				socket.emit('moveRelations',{id:relation_id,x1:result[0].x1,x2:result[0].x2,y1:result[0].y1,y2:result[0].y2});}
		});
	}
})
}	//EOF FUNCTION
	});
