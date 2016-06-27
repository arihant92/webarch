"use strict";

var webarch = new WebArch();

function WebArch(){
	var version = ".1";
}


//
//	Pass the changed/added element to the server
//
WebArch.prototype.changeElement = function(xtype, t){
	var idm = t.attr("id");
	var jsn = xser.serializeToString(t[0][0]);
	socket.emit(xtype,{id:idm, obj:jsn});
}

//
//	Pass the moved element to the server
//
WebArch.prototype.moveElement = function(obj, x0, y0){
	socket.emit('move', {id:obj.attr("id"), x:x0, y:y0});
}

//
//	Pass the text change event to the server
//
WebArch.prototype.changeText = function(obj, txt, coords){
	socket.emit('text-change', {id: obj.attr("id"), text:txt, coords:coords});
}

//WebArch.prototype.updateArray = function(obj,x,y,id,session);


WebArch.prototype.processTextChange = function(d){
	var target = d3.select("#" + d.id);
	target.select("text").remove("text");
	createSVGtext(target, d.text, d.coords.x, d.coords.y);
	//console.log(target, d.text, d.coords.x, d.coords.y);
}

//
//	Process an incoming move from the server
//
WebArch.prototype.processMove = function(d){
   if(d.d!=undefined){
//relation
document.getElementById(d.id).setAttribute("d",d.d);

	 }else{
	var obj = d3.select("#" + d.id);
	if(obj){
		var trans = obj.transition();
		trans.attr("x", d.x).attr("y", d.y);
		obj.data([{x:d.x, y:d.y}]);
	}else{
		console.log('ERROR: Cannot find ' + d);
	}
}

}

//
//	Process an incoming change (addition) from the server
//
WebArch.prototype.processChange = function(d){
//	console.log(d);
	var o = parser.parseFromString(d.obj, "image/svg+xml");
	var c = document.importNode(o.getElementsByTagName("svg")[0], true);
	var newObj = webarch.cloneIncoming(c);
}

//
//	Does the needful for ensuring we have the correct new object added
//
WebArch.prototype.cloneIncoming = function(obj){
	var nobj = eval('new ' + obj.attributes["data"].value + "();");
	if(nobj){ nobj.addTo(drawing, obj.attributes["x"].value, obj.attributes["y"].value, obj.attributes["id"].value);}
}





function GUID(){
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
         return 'WA' + v.toString(16);
    });
    return guid;
}
this.GUID=GUID;

function createSVGtext(parent, caption, x, y) {
    //  This function attempts to create a new svg "text" element, chopping
    //  it up into "tspan" pieces, if the caption is too long
    //
    var svgText = parent.append("text");
    svgText.attr('x', x);
    svgText.attr('y', y);
    svgText.style('font-size', 12);
    svgText.attr('text-anchor', 'middle');   //  Center the text

    //  The following two variables should really be passed as parameters
    var MAXIMUM_CHARS_PER_LINE = 20;
    var LINE_HEIGHT = 16;

    var words = caption.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        if (testLine.length > MAXIMUM_CHARS_PER_LINE)
        {
            //  Add a new <tspan> element
            var svgTSpan = svgText.append("tspan");
            svgTSpan.attr('x', x);
            svgTSpan.attr('y', y);

            svgTSpan.append("text").text(line);

            line = words[n] + " ";
            y += LINE_HEIGHT;
        }
        else {
            line = testLine;
        }
    }

    var svgTSpan = svgText.append("tspan");

    svgTSpan.attr('x', x);
    svgTSpan.attr('y', y);
    svgTSpan.text(line);

}

function setCursorType(elementType, mode){
	//TODO: set the cursor type based on the element and the action
	if(relationshipMode){
		document.body.style.cursor = 'crosshair';
	}else{
		document.body.style.cursor = mode;
	}
}

function setCursor(mode){
	document.body.style.cursor = mode;
}
