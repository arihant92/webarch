var line;
var path;

var layer= d3.select("#svg1").append("svg")
.attr("width",1000)
.attr("height",1000)
.on("mousedown",mousedown)
.on("mouseup",mouseup);

function drawline(){
var draw= layer.append("line").attr("x1",x).attr("y1",y).attr("x2",endx).attr("y2",endy).attr("stroke-width",2)
                                  .attr("stroke","red");
}



var vis = d3.select("#svg1").append("svg")
    .attr("width", 600)
    .attr("height", 400)
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);
*/
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
        var m = d3.mouse(this);
        line.attr("x2", m[0])
            .attr("y2", m[1])
            .attr("stroke-width",2)
            .attr("stroke","red");


    }

    function mouseup() {
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
                                              .attr("stroke", "blue")
                                              .attr("stroke-width", 2)
                                              .attr("fill", "none");


    }
