linea.prototype= new Figure();
linea.prototype.constructor = linea;

linea.prototype.getTextCoords = function(){
  //alert("in here!!!");
   return {x: 200, y:200};
  }


  function linea() {
    var coords = null;

  }
function trycapture(){



var distance_array=[];
var anchor_array=[];

function distance(x,y,x0,y0){

 var path_length =  Math.sqrt((x -= x0) * x + (y -= y0) * y);
 //Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));

return path_length;
}



function deletepath(){


  $("path").one("click", function() {
    if(this.id!='main_svg')   //condition
    {
    a1=this.id;
    //alert(a1);
    d3.select("#"+a1).remove();
  }
  });

}





getdiv1();
coordinates = [];
id_index=[];
function getdiv1(){
  $("svg").one("click", function() {
    if(this.id!='main_svg')   //condition
    {
    a1=this.id;
  //  alert(a1);
var   x_value=this.x.baseVal.value ;
var  y_value=this.y.baseVal.value ;

  //console.log(x_value);
    //console.log(y_value);

a1coords=getCoordinates(a1,x_value,y_value);
    $('svg').unbind('click');
    getdiv2();
      //anchorCoordinates(a1);
   }
  });

  }


//second
function getdiv2(){
  $("svg").one("click", function() {
    if(this.id!='main_svg')   {
    a2=this.id;
      $('svg').unbind('click');
      var   x_value=this.x.baseVal.value ;
      var  y_value=this.y.baseVal.value ;
    a2coords= getCoordinates(a2,x_value,y_value);


    anchor1=anchorCoordinates(a1,a1coords);
    anchor2=anchorCoordinates(a2,a2coords);

    var element_1 = new Array([anchor1.anchor1_x,anchor1.anchor1_y],[anchor1.anchor2_x,anchor1.anchor2_y],[anchor1.anchor3_x,anchor1.anchor3_y],[anchor1.anchor4_x,anchor1.anchor4_y]);
    var element_2 = new Array([anchor2.anchor1_x,anchor2.anchor1_y],[anchor2.anchor2_x,anchor2.anchor2_y],[anchor2.anchor3_x,anchor2.anchor3_y],[anchor2.anchor4_x,anchor2.anchor4_y]);



    var closest = {a: false, b: false, distance: false};

    for(var i=0; i<element_1.length; i++) {
      for(var j=0; j<element_2.length; j++) {
        var distance = calculate_distance(element_1[i], element_2[j]);
        //console.log('Distance between element_1['+i+'] and element_2['+j+']: ' + distance);
        if(closest.distance === false || distance < closest.distance) {
           closest = {a: element_1[i], b: element_2[j], distance: distance};
        }
      }
    }


    //emit_coordinate_x1=closest.a[0];
    //emit_coordinate_y1=closest.a[1];
    //emit_coordinate_x2=closest.b[0];
    //  emit_coordinate_y2=closest.b[1];



    //console.log('The shotest path is between '+closest.a[0]+' and '+closest.b+', which is '+closest.distance);

    function calculate_distance(a, b) {
    var width  = Math.abs( a[0] - b[0] ),
      height = Math.abs( a[1] - b[1] ),
      hypothenuse = Math.sqrt( width*width + height*height );
    return hypothenuse;
    }


//console.log("drawing coordinates "+ closest.a[0],closest.a[1],closest.b[0],closest.b[1]);
 drawAggregate(closest.a[0],closest.a[1],closest.b[0],closest.b[1]);
 socket.emit('make-path',{ id:drawAggregate.new_id, x1: closest.a[0], y1:closest.a[1] ,x2:closest.b[0],y2: closest.b[1] ,path_type:"aggregate",from:a1,to:a2});
 Mousetrap.bind('command+e', function(e) {
     drawAggregate(closest.b[0],closest.b[1],closest.a[0],closest.a[1]);
 });
    }
  });

}

//get outer box coordinates



}//main end

function drawAggregate(x1,y1,x2,y2,id)
  {
    if(id===undefined){
var new_id="aggregation"+GUID();
 //console.log(new_id);
 }else{var new_id=id;}


    var layer= d3.select("#main_svg");

    var lineData = [ { "x": x1,   "y": y1},{ "x": x2,   "y":y2}];

    var lineFunction = d3.svg.line()
                             .x(function(d) { return d.x; })
                            .y(function(d) { return d.y; })
                            .interpolate("step");
               lineGraph = layer.append("path")
                                          .attr("d", lineFunction(lineData))
                                          .attr("stroke", "black")
                                          .attr("stroke-width", 1)
                                          .attr("fill", "none")
                                          .attr("id",new_id)
                                          .attr('etype', 'path')
                                          .attr("x",200)
                                          .attr("y",200)
                                          .attr("display","block")
                                          .attr("data", "linea")	.style('marker-end', "url(#end-arrow)")
                                          //.on("dblclick",function(d){
                                            //alert("double");
                                            //}
                                            .on("dblclick", linea.prototype.editText);

                                            //d3.select(this).remove()});

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




  }

  function anchorCoordinates(id,which){

  var width = Math.round(document.getElementById(id).getBBox().width);
  var height = Math.round(document.getElementById(id).getBBox().height);

  var anchor1_x=(which.left+(width/2));
  var anchor1_y=which.top;
  var anchor2_x=which.left+width;
  var anchor2_y=(which.top+(height/2));
  var anchor3_x=anchor1_x;
  var anchor3_y=anchor1_y+height;
  var anchor4_x=which.left;
  var anchor4_y=anchor2_y;



  return{

            anchor1_x:anchor1_x,
            anchor1_y:anchor1_y,
            anchor2_x:anchor2_x,
            anchor2_y:anchor2_y,
            anchor3_x:anchor3_x,
            anchor3_y:anchor3_y,
            anchor4_x:anchor4_x,
            anchor4_y:anchor4_y

          }
  }


      function getCoordinates(id,x,y){

        scroll_value_Y=document.getElementById("svg_editor").scrollTop;
        scroll_value_X=document.getElementById("svg_editor").scrollLeft;

        offset_x=250;
        offset_y=147;
          var p = $('#'+id);
          var offset = p.offset();
          var left=(offset.left-offset_x+scroll_value_X);//problem is here
          var top= offset.top-offset_y+scroll_value_Y;//problem is here
  //console.log("left here"+left);
          return {
                top: y,
                left: x
              }

      }

//this.drawAggregate = drawAggregate;
