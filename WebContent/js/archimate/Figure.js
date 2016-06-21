"use strict";

var current_text='';
var current_path='';
//Base Class for all Figure Elements

function Figure(){
	var version = ".1";
}



Figure.prototype.setHandlers = function(g){
	g.on("dblclick", this.editText);
	g.on("mouseover", this.mouseOver);
	g.on("mouseout", this.mouseOut);
	g.on("click", this.mouseClick);
}

Figure.prototype.mouseClick = function(d){
	if(relationshipMode){
		var obj = d3.select(this);
		TOOL.addTo(drawing, obj.attr('x'), obj.attr('y'), d3.event.x, d3.event.y);
	}

}

Figure.prototype.mouseUp = function(d){
	if(relationshipMode && startObject!=null){

	}
}


Figure.prototype.mouseOut = function(d){
	setCursor('default');
	d3.select(this).select("#selected").remove();
	if(d3.select("#svg-edit-text")){
		d3.select("#svg-edit-text").remove();
	}
}

Figure.prototype.editText = function(){
	var target = d3.select(this);

	var cx = target.attr("x");
	var cy = target.attr("y");

	//TODO: make sure the editor appears in the same location on the element each time rather than in a click location
	var obj = d3.select("#text-input")
		.style("display", "block")
		.style("top", d3.event.pageY + "px")
		.style("left", d3.event.pageX + "px")
		.attr("data-target", "#" + target.attr("id"))
		.attr("value", "")
		.on("blur", Figure.prototype.hideTextInput);
	document.getElementById("text-input").focus();

}


//
//	Removed the text input area when we're done.
//
Figure.prototype.hideTextInput = function(){
	var tx = d3.select("#text-input")
	var v = this.value;
	//console.log(v);
	tx.style("display", "none");
	var target = d3.select(tx.attr("data-target"));
	var etype = target.attr("etype");
	var id = target.attr("id");
	target.select("text").remove("text");

	var coords = eval(target.attr("data") + ".prototype.getTextCoords();");//HEREHEREHEREHERHEHERERHEHEHREHRHEHERE
	createSVGtext(target, v, coords.x, coords.y);
	webarch.changeText(target, v, coords);

	if(etype=='path'){

		var text = d3.select("#main_svg").append("text");
		var something= "#"+text_Path_id;



if((current_text!='')&&(current_path!='')){ //checking if the text is empty
if(((current_path==id)&&(current_text!=v))||((current_path!=id)&&(current_text!=v))){
d3.select("#"+current_text).remove();
//current_path=id;
}
}

		//console.log(text);
var text_Path_id=GUID();
		text.append("textPath")
		     .attr("id",text_Path_id)
				.attr("xlink:href","#"+id)
				.text(v);

current_text=text_Path_id;
current_path=id;


	//track.push(text_Path_id);
	}// end of IF
}

//Funnction to give paths caption


//
//  Handles the move event, including sending the event to the server.
///
Figure.prototype.move = function(d){

	if(!relationshipMode){
		d.x = (d3.event.x).MRound(10);
		d.y = (d3.event.y).MRound(10);

		checkExpanse(d.x+125, d.y+65);

		d3.select(this).attr("x", d.x).attr("y", d.y);

		var obj = d3.select(this);
		obj.attr("x", d.x).attr("y", d.y);

		webarch.moveElement(obj, d.x, d.y);
		}

}
