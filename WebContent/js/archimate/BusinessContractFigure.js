function BusinessContractFigure() {
}

BusinessContractFigure.prototype = {
	
	addTo : function(c, x0, y0) {
			
		var n = d3.select(this);
		
		var dm = d3.behavior.drag()
			.origin(function(d){return d;})
			.on("drag", this.moveElement);
		
		var g = c.append("svg").call(dm).data([{x:x0, y:y0}]);
				
		this.paint(g);
				
		g.attr("x", x0);
		g.attr("y", y0);
		
		
		if(SHADOWS){
			g.style("filter", "url(#dropShadow)");
		}
		
		return g;
				
	},
	
	paint : function(g){
		g.append("rect")
			.attr("x", 0)
			.attr("y", 0)
			.attr("width", 120)
			.attr("height", 42 + FLANGE_FACTOR)
			.attr("fill", "rgb(255,255,181)")
			.attr("stroke-linejoin", "round")
			.attr("stroke", "rgb(178,178,126)")
			.attr("stroke-width", "1");
		g.append("line")
			.attr("x1", 0)
			.attr("x2", 120)
			.attr("y1", FLANGE_FACTOR)
			.attr("y2", FLANGE_FACTOR)
			.attr("fill", "none")
			.attr("stroke", "rgb(178,178,126)")
			.attr("stroke-width");
	},
	
	moveElement: function(d){
		
		d.x = (d3.event.x).MRound(10);
		d.y = (d3.event.y).MRound(10);
		
		checkExpanse(d.x+125, d.y+65);
		
		d3.select(this).attr("x", d.x).attr("y", d.y);
	},

}