plumb.prototype = new Figure();
plumb.prototype.constructor = plumb;


plumb.OFFSET = 0;

function plumb() {
	var coords = null;

}


plumb.prototype.addTo = function(c, x0, y0, id) {

	var n = d3.select(this);

	var dragger = d3.behavior.drag()
		.origin(function(d){return d;})
		.on("drag", this.move);

	var g = c.append("svg").data([{x:x0, y:y0}]);

	this.paint(g);

	g.attr("x", x0);
	g.attr("y", y0);
	g.attr("id", id?id:GUID());

clickx=x0;
clicky=y0;
	this.setHandlers(g);
//
	if(SHADOWS){
		g.style("filter", "url(#dropShadow)");
	}
//

	return g;

}






plumb.prototype.paint = function(g){
////asdfasdfasdf

flag=0;

//Code of index.html

var line;
var path;


if(flag==0){
var layer= d3.select("#main_svg")
.attr("width",1000)
.attr("height",1000)
.on("mousedown",mousedown)
.on("mouseup",mouseup);





		function mousedown() {
				var m = d3.mouse(this);
				line = g.append("line")

//defining the end points of path (x2,y2)
x1=m[0];
y1=m[1];

	g.on("mousemove", mousemove); // TO define on move



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

			//d3.selectAll("path.line").remove();
				var m = d3.mouse(this);
				g.on("mousemove", null);

				var lineData = [ { "x": clickx,   "y": clicky+15},{ "x": m[0],   "y": m[1]}];
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
																							.attr("data", "plumb")
																							.style('marker-end', "url(#end-arrow)");
//console.log(m[0],"  ",m[1]);
//////////////////// arrowheads
																							// define arrow markers for graph links
																						     g.append('svg:defs').append('svg:marker')
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

}//Flag scope

	g.attr("data", "plumb")


/////////////

	g.append("line")
		.attr("x1", plumb.OFFSET)
		.attr("x2", 60 + plumb.OFFSET)
		.attr("y1", FLANGE_FACTOR+1+plumb.OFFSET)
		.attr("y2", FLANGE_FACTOR+1+plumb.OFFSET)
		.attr("fill", "none")
		.attr("stroke", "rgb(178,178,126)")
		.attr("stroke-width",5);


{// start of for loop



		$("svg").click(function() {
				if(this.id!='main_svg')	{
		    alert(this.id); // or alert($(this).attr('id'));
			}
		});
}
///




}

plumb.handleCoords = [ [61,0], [121,28], [61,58], [0,28] ];

plumb.prototype.mouseOver = function(d){
	var o = d3.select(this);
	var g = o.append("g").attr("id", "selected");

	setCursorType('plumb', 'move');

	g.append("rect")
		.attr("x", plumb.OFFSET-1)
		.attr("y", plumb.OFFSET-1)
		.attr("width", 122)
		.attr("height", 44 + FLANGE_FACTOR)
		.attr("fill", "none")
		.attr("stroke", "rgb(127,127,0)")
		.attr("stroke-width", 1);

	for(var i=0;i<plumb.handleCoords.length; i++){
		g.append("rect")
		.attr("x", plumb.handleCoords[i][0])
		.attr("y", plumb.handleCoords[i][1])
		.attr("width", 6)
		.attr("height", 6)
		.attr("fill", "rgb(200,0,0)")
		.attr("stroke", "rgb(127,127,0)")
		.attr("stroke-width", 1);
	}



}


plumb.prototype.getTextCoords = function(){
	return {x: 60, y:30};
}
