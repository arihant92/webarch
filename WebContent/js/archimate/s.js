Number.prototype.MRound = function(mult)
{
	if (isNaN(mult)) return null;
	mult = Number(mult);
	var temp = this % mult;
	temp = Number((this - temp).toFixed(0));
	if ((mult / 2) <= Math.abs(this - temp))
	{
		if (temp < 0) temp -= mult;
		else temp += mult;
	}
	return temp;
}

function Exception(v){
	return v;
}

function Parent(){
	
}

Parent.prototype.something = function(a){
	console.log("parent " + a);
}

function Child(){
	
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

Child.prototype.something = function(b){
	console.log("child " + b);
	Parent.prototype.something.call(this, b);
}

var c = new Child();
c.something("somevalue");



var drawing = d3.select("#svg_editor").append("svg")
.attr("id", "main_svg")
.style("width", "100%")
.style("height", "100%");

var defs = drawing.append("defs");

var basic_marker = defs.append("marker")
	.attr("id", "basic")
	.attr("viewBox", "0 0 10 10")
	.attr("refX", 0)
	.attr("refY", 5)
	.attr("markerUnits", "strokeWidth")
	.attr("markerWidth", 7)
	.attr("markerHeight", 5)
	.attr("orient", "auto");
basic_marker.append("path")
	.attr("d", "M 0 0 L 10 5 L 0 10 z");


var lp = drawing.append("svg");

lp.attr("data-from", "component");
lp.attr("data-to", "component");
lp.attr("id", "SOMEGUIDHERE");

lp.append("line")
	.attr("x1", 0)
	.attr("y1", 20)
	.attr("x2", 200)
	.attr("y2", 20)
	.attr("stroke", "black")
	.attr("stroke-width", 2)
	.attr("stroke-dasharray", "5,5")
	.attr("marker-end", "url(#basic)")
	.attr("id", "mypath");

//add the head dragger
var rect = lp.append("rect")
	.attr("x", 200-3)
	.attr("y", 20 -5)
	.attr("height", 10)
	.attr("width", 10)
	.attr("stroke-width", 0)
	.attr("fill", "white")
	.attr("fill-opacity", "0")
	.attr("stroke", "red")
	.attr("data", "#mypath");

rect.call(dragHead).data([{x:197, y:15}]);

//add the tail dragger
var rect2 = lp.append("rect")
	.attr("x", 0)
	.attr("y", 20 -5)
	.attr("height", 10)
	.attr("width", 10)
	.attr("stroke-width", 0)
	.attr("fill", "white")
	.attr("fill-opacity", "0")
	.attr("stroke", "red")
	.attr("data", "#mypath");

rect2.call(dragTail).data([{x:0, y:15}]);


