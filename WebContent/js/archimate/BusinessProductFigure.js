BusinessProductFigure.prototype = new Figure();
BusinessProductFigure.prototype.constructor = BusinessProductFigure;

BusinessProductFigure.OFFSET = 4;

function BusinessProductFigure() {
	var coords = null;

}

myglobal={};

bpx=[];
bpy=[];

BusinessProductFigure.prototype.addTo = function(c, x0, y0, id) {
//socket.emit("initial_global_path",global_paths);
	var n = d3.select(this);
	var wasMoved = false;
	var dragger = d3.behavior.drag()
		.origin(function(d){return d;})
		.on("drag", this.move)
		.on("dragend", dropHandler)



			      function dropHandler(d) {
			          if (myglobal.moveflag==true) {
			              //console.log("dropped");
			              myglobal.moveflag = false;
										socket.emit("redraw",{id:this.id,x:this.x.baseVal.value,y:this.y.baseVal.value});
										socket.emit("initialize move",{id:this.id,x:this.x.baseVal.value,y:this.y.baseVal.value})
											//redraw(this.id,this.x.baseVal.value,this.y.baseVal.value);

			          } else {
			              //console.log("clicked");
			          }
			      }



//alert("evenonclick");


			//console.log(this.x.baseVal.value);

//var f = c.append("div").attr("id","wassup");
	var g = c.append("svg").call(dragger).data([{x:x0, y:y0}]);
//global_array.push(["BusinessProductFigure",x0,y0,8888]);
	this.paint(g);

	g.attr("x", x0);
	g.attr("y", y0);
	g.attr("id", id?id:GUID());


	bpy.push(y0);
	bpx.push(x0);


	this.setHandlers(g);
/*
	if(SHADOWS){
		g.style("filter", "url(#dropShadow)");
	}
*/
	return g;

}

BusinessProductFigure.prototype.paint = function(g){





	g.attr("data", "BusinessProductFigure");
	g.append("rect")
		.attr("x", BusinessProductFigure.OFFSET)
		.attr("y", BusinessProductFigure.OFFSET)
		.attr("width", 60)
		.attr("height", FLANGE_FACTOR)
		.attr("fill", "rgb(299,299,162)")
		.attr("stroke-linejoin", "round")
		.attr("stroke", "rgb(299,299,162)")
		.attr("z-index", 2)
		.attr("stroke-width", "1");
	g.append("rect")
		.attr("x", 60 + BusinessProductFigure.OFFSET)
		.attr("y", BusinessProductFigure.OFFSET)
		.attr("width", 60)
		.attr("height", FLANGE_FACTOR)
		.attr("fill", "rgb(255,255,181)")
		.attr("stroke-linejoin", "round")
		.attr("stroke", "rgb(255,255,181)")
		.attr("stroke-width", "0");
	g.append("rect")
		.attr("x", BusinessProductFigure.OFFSET)
		.attr("y", FLANGE_FACTOR + BusinessProductFigure.OFFSET)
		.attr("width", 120)
		.attr("height", 42)
		.attr("fill", "rgb(255,255,181)")
		.attr("stroke-linejoin", "round")
		.attr("stroke", "rgb(255,255,181)")
		.attr("stroke-width", "0");
	g.append("rect")
		.attr("x", BusinessProductFigure.OFFSET)
		.attr("y", BusinessProductFigure.OFFSET)
		.attr("width", 120)
		.attr("height", 42 + FLANGE_FACTOR)
		.attr("stroke", "rgb(178,178,126)")
		.attr("stroke-width", 1)
		.attr("fill", "none");
	g.append("line")
		.attr("x1", BusinessProductFigure.OFFSET)
		.attr("x2", 60 + BusinessProductFigure.OFFSET)
		.attr("y1", FLANGE_FACTOR+1+BusinessProductFigure.OFFSET)
		.attr("y2", FLANGE_FACTOR+1+BusinessProductFigure.OFFSET)
		.attr("fill", "none")
		.attr("stroke", "rgb(178,178,126)")
		.attr("stroke-width");
	g.append("line")
		.attr("x1", 60 + BusinessProductFigure.OFFSET)
		.attr("x2", 60 + BusinessProductFigure.OFFSET)
		.attr("y1", BusinessProductFigure.OFFSET)
		.attr("y2", FLANGE_FACTOR+1+BusinessProductFigure.OFFSET)
		.attr("fill", "none")
		.attr("stroke", "rgb(178,178,126)")
		.attr("stroke-width");

}


BusinessProductFigure.handleCoords = [ [61,0], [121,28], [61,58], [0,28] ];

BusinessProductFigure.prototype.mouseOver = function(d){
	var o = d3.select(this);
	var g = o.append("g").attr("id", "selected");

	setCursorType('BusinessProductFigure', 'move');

	g.append("rect")
		.attr("x", BusinessProductFigure.OFFSET-1)
		.attr("y", BusinessProductFigure.OFFSET-1)
		.attr("width", 122)
		.attr("height", 44 + FLANGE_FACTOR)
		.attr("fill", "none")
		.attr("stroke", "rgb(127,127,0)")
		.attr("stroke-width", 1);

	for(var i=0;i<BusinessProductFigure.handleCoords.length; i++){
		g.append("rect")
		.attr("x", BusinessProductFigure.handleCoords[i][0])
		.attr("y", BusinessProductFigure.handleCoords[i][1])
		.attr("width", 6)
		.attr("height", 6)
		.attr("fill", "rgb(200,0,0)")
		.attr("stroke", "rgb(127,127,0)")
		.attr("stroke-width", 1);
	}



}

BusinessProductFigure.prototype.getTextCoords = function(){
	return {x: 60, y:30};
}
