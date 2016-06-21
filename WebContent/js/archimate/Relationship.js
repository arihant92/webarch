var startObject = null;
var endObject = null;

function Relationship(){
	
}

Relationship.prototype.startDraw = function(startObj, x0, y0){
	
}


Relationship.prototype.addTo = function(c, startx, starty, endx, endy){
	
	var n = d3.select(this);
	
	var dragHead = d3.behavior.drag()
		.origin(function(d){return d;})
		.on("drag", this.relationshipHeadMove);

	var dragTail = d3.behavior.drag()
		.origin(function(d){return d;})
		.on("drag", this.relationshipTailMove);
	
	
	var g = c.append("svg").call(dragHead).data([{x:startx, y:starty}]);
	
	this.paint(g, {x:startx, y:starty}, {x:endx, y:endy});

	g.attr("x", startx);
	g.attr("y", starty);
	g.attr("id", id?id:GUID());
	
	//webarch.setHandlers.call(this, g);
	
	
	if(SHADOWS){
		g.style("filter", "url(#dropShadow)");
	}
	
	return g;
	
	
};

Relationship.prototype.paint = function(g, start, end){
	
	//g.attr("data", "RelationshipAssociation");
	g.append("line")
		.attr("x1", start.x)
		.attr("y1", start.y)
		.attr("x2", end.x)
		.attr("y2", end.y);
	
};


//move the head
Relationship.prototype.relationshipHeadMove = function (d){
	d.x = (d3.event.x).MRound(10);
	d.y = (d3.event.y).MRound(10);
	var obj = d3.select(this);
	obj.data([{x:d.x, y:d.y}]);
	obj.attr("x", d.x).attr("y", d.y);
	var oo = d3.select(obj.attr("data"));
	oo.attr("x2", d.x).attr("y2", d.y);
}

//move the tail
Relationship.prototype.relationshipTailMove = function (d){
	d.x = (d3.event.x).MRound(10);
	d.y = (d3.event.y).MRound(10);
	var obj = d3.select(this);
	obj.data([{x:d.x, y:d.y}]);
	obj.attr("x", d.x).attr("y", d.y);
	var oo = d3.select(obj.attr("data"));
	oo.attr("x1", d.x).attr("y1", d.y);
}

//
//	Mouse Up Event. Set the line between the two objects
//
Relationship.prototype.mouseUp = function(d){
	
}



