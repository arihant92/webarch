newline.prototype = new Figure();
newline.prototype.constructor = newline;

newline.OFFSET = 0;

function newline() {
	var coords = null;

}


newline.prototype.addTo = function(c, x0, y0, id) {

	var n = d3.select(this);

	var dragger = d3.behavior.drag()
		.origin(function(d){return d;})
		.on("drag", this.move);

	var g = c.append("svg").data([{x:x0, y:y0}]);

	this.paint(g);

	g.attr("x", x0);
	g.attr("y", y0);
	g.attr("id", id?id:GUID());











	this.setHandlers(g);
//
	if(SHADOWS){
		g.style("filter", "url(#dropShadow)");
	}
//

	return g;

}

newline.prototype.paint = function(g){
////asdfasdfasdf

flag=0;

//Code of index.html

var line;
var path;

var layer= d3.select("#main_svg").append("svg")

.attr("width",1000)
.attr("height",1000)
.on("mousedown",mousedown)
.on("mouseup",mouseup);

if(flag==0){


var vis = d3.select("#main_svg")
		.attr("width", 600)
		.attr("height", 400)
		.on("mousedown", mousedown)
		.on("mouseup", mouseup);

		function mousedown() {
				var m = d3.mouse(this);
				line = layer.append("line")
						.attr("x1", m[0])
						.attr("y1", m[1])
						.attr("x2", m[0])
						.attr("y2", m[1])
						.attr("stroke-width",2)
						.attr("stroke","red");


x1=m[0];
y1=m[1];

	layer.on("mousemove", mousemove);



		}

		function mousemove() {
	/*			var m = d3.mouse(this);
				line.attr("x2", m[0])
						.attr("y2", m[1])
						.attr("stroke-width",2)
						.attr("stroke","red");

 var lineData = [ { "x": x1,   "y": y1},{ "x": m[0],   "y": m[1]}];
 var lineFunction = d3.svg.line()
													.x(function(d) { return d.x; })
												 .y(function(d) { return d.y; })
												 .interpolate("step");
						lineGraph = layer.append("path")
																			.attr("d", lineFunction(lineData))
																			 .attr("stroke", "blue")
																			 .attr("stroke-width", 2)
																			 .attr("fill", "none");

*/

		}

		function mouseup() {

if(flag==0){

			d3.selectAll("path.line").remove();
				var m = d3.mouse(this);
				layer.on("mousemove", null);

				var lineData = [ { "x": x1,   "y": y1},{ "x": m[0],   "y": m[1]}];
				var lineFunction = d3.svg.line()
																 .x(function(d) { return d.x; })
																.y(function(d) { return d.y; })
																.interpolate("step");
									 lineGraph = layer.append("path")
																							.attr("d", lineFunction(lineData))
																							.attr("stroke", "black")
																							.attr("stroke-width", 2)
																							.attr("fill", "none")
																							.attr("id","aggregation")
																							.attr("data", "newline")
																							.style('marker-end', "url(#end-arrow)");

//////////////////// arrowheads
																							// define arrow markers for graph links
																						     layer.append('svg:defs').append('svg:marker')
																						         .attr('id', 'end-arrow')
																						         .attr('viewBox', '0 -12 20 20')
																						         .attr('refY', -5)
																						         .attr('markerWidth', 10)
																						         .attr('markerHeight', 10)
																										 .attr("stroke-width", 2)
																						         .attr('orient', 'auto')
																						         .append('svg:path')
																						             .attr('d', 'M0,-5 L8,0 L16,-5 L8,-10 L0,-5')
																												 .attr('stroke','black')
																						             .attr('fill', 'none');






//console.log(flag);
flag=1;
//console.log("after"+flag);
			}//Eofif
		}

}

	g.attr("data", "newline")


/////////////

	g.append("line")
		.attr("x1", newline.OFFSET)
		.attr("x2", 60 + newline.OFFSET)
		.attr("y1", FLANGE_FACTOR+1+newline.OFFSET)
		.attr("y2", FLANGE_FACTOR+1+newline.OFFSET)
		.attr("fill", "none")
		.attr("stroke", "rgb(178,178,126)")
		.attr("stroke-width",5);



}


newline.handleCoords = [ [61,0], [121,28], [61,58], [0,28] ];

newline.prototype.mouseOver = function(d){
	var o = d3.select(this);
	var g = o.append("g").attr("id", "selected");

	setCursorType('newline', 'move');

	g.append("rect")
		.attr("x", newline.OFFSET-1)
		.attr("y", newline.OFFSET-1)
		.attr("width", 122)
		.attr("height", 44 + FLANGE_FACTOR)
		.attr("fill", "none")
		.attr("stroke", "rgb(127,127,0)")
		.attr("stroke-width", 1);

	for(var i=0;i<newline.handleCoords.length; i++){
		g.append("rect")
		.attr("x", newline.handleCoords[i][0])
		.attr("y", newline.handleCoords[i][1])
		.attr("width", 6)
		.attr("height", 6)
		.attr("fill", "rgb(200,0,0)")
		.attr("stroke", "rgb(127,127,0)")
		.attr("stroke-width", 1);
	}



}

newline.prototype.getTextCoords = function(){
	return {x: 60, y:30};
}
