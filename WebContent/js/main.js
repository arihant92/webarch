"use strict";

var INDENTATION = 0;
var SNAP = 5;

var FLANGE_FACTOR = 14;
var SHADOWS = false;

var TOOL = null;

var xser = new XMLSerializer();
var parser = new DOMParser();

var relationshipMode = false;



var drawing = d3.select("#svg_editor").append("svg")
	.attr("id", "main_svg")
	.style("width", 1000)
	.style("height", 1000)
	.attr("xmlns", "http://www.w3.org/2000/svg")
	.attr("version", "1.1")
	.on("click", addElement)
	.on("mouseover", defaultCursor);


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

//
//Check to see if we're moving an object out out bounds and, if so, scroll or expand the svg area
//
function checkExpanse(x, y){

	//check bounds
	var w = drawing.style("width");
	var h = drawing.style("height");

	if(x>w){
		drawing.style("width", w+x);
	}
	if(y>h){
		drawing.style("height", h+y);
	}

}



function setupSpace(){

	var defs = drawing.append("defs");
	var ds = defs.append("filter")
		.attr("id", "dropShadow")
		.attr("y", -5)
		.attr("x", -5)
		.attr("height", 50)
		.attr("width", 100);

	ds.append("feOffset")
		.attr("in", "SourceAlpha")
		.attr("dx", 2)
		.attr("dy", 2)
		.attr("result", "offset2");

	ds.append("feGaussianBlur")
		.attr("in", "offset2")
		.attr("stdDeviation", 2)
		.attr("result", "blur2");

	var merge = ds.append("feMerge");
		merge.append("feMergeNode")
			.attr("in", "offset2");
		merge.append("feMergeNode")
			.attr("in", "SourceGraphic");

}

function selectTool(v){
	TOOL = v;
	if(TOOL instanceof Relationship){
		relationshipMode = true;
	}else{
		relationshipMode = false;
	}
}

function addElement(d){
	var x0 = d3.select("#main_svg").attr("x");
	var y0 = d3.select("#main_svg").attr("y");
	if(TOOL){
		if(TOOL instanceof Figure){
			var ne = TOOL.addTo(drawing, d3.mouse(this)[0], d3.mouse(this)[1]);
			ne.attr("xmlns", "http://www.w3.org/2000/svg");
			ne.attr("version", "1.1");
			TOOL = null;
			webarch.changeElement('change', ne);
		}else{

		}
	}
}

function defaultCursor(){
	if(relationshipMode){
		setCursor('not-allowed');
	}else{
		setCursor('default');
	}
}


setupSpace();



//connect to the server
var socket = io();
socket.emit('event', {d: "I'm Here!",session:session});
console.log('connected');


socket.emit('room', session);

socket.on('change', function(d){if(d.session==session){webarch.processChange(d)}});
socket.on('move', webarch.processMove);
socket.on('text-change', webarch.processTextChange);
socket.on('make-path', function(data){
if(data.session==session){
var emit_x1=data.x1;
var emit_y1=data.y1;
var emit_x2=data.x2;
var emit_y2=data.y2;
var new_id=data.id;
var try_obj = new trycapture;

drawAggregate(emit_x1,emit_y1,emit_x2,emit_y2,new_id);
}
 });
//var bcf = new BusinessContractFigure();
//bcf.addTo(drawing, 0, 0);
