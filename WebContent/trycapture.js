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

drawing_instructions(element_1,element_2,a1,a2);



    }
  });

}

//get outer box coordinates



}//main end





function drawing_instructions(element_1,element_2,a1,a2)
{
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


  function calculate_distance(a, b) {
  var width  = Math.abs( a[0] - b[0] ),
    height = Math.abs( a[1] - b[1] ),
    hypothenuse = Math.sqrt( width*width + height*height );
  return hypothenuse;
  }

var path_id=GUID();
drawAggregate(closest.a[0],closest.a[1],closest.b[0],closest.b[1],path_id,a1,a2);
//emitting path to server
//repeating
socket.emit('make-path',{ id:drawAggregate.new_id, x1: closest.a[0], y1:closest.a[1] ,x2:closest.b[0],y2: closest.b[1] ,path_type:"aggregate",from:a1,to:a2,id:path_id});

Mousetrap.bind('command+e', function(e) {
   drawAggregate(closest.b[0],closest.b[1],closest.a[0],closest.a[1]);
});


}
//function that has the path drawing properties
function drawAggregate(x1,y1,x2,y2,id,a1,a2)
  {

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
                                          .attr("id",id)
                                          .attr('etype', 'path')
                                          .attr('z-index', 1)
                                          .attr("display","block")
                                          .attr("data", "linea")	.style('marker-end', "url(#end-arrow)")
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

socket.emit('dvalue',{id:id,d:lineFunction(lineData)});


  }

  function anchorCoordinates(id,which){

  var width = Math.round(document.getElementById(id).getBBox().width);
  var height = Math.round(document.getElementById(id).getBBox().height);

//console.log(width,height);
  var anchor1_x=(which.left+(width/2));
  var anchor1_y=which.top;
  var anchor2_x=which.left+width;
  var anchor2_y=(which.top+(height/2));
  var anchor3_x=anchor1_x;
  var anchor3_y=anchor1_y+height;
  var anchor4_x=which.left;
  var anchor4_y=anchor2_y;

//console.log(which);


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




      function redraw(id,x,y){
      //incoming: Id of the element, its x valye, its y value
      var which ={left:x,top:y};// creating object
      var anchor_obj1=anchorCoordinates(id,which);
      //getting all "TO elements to which the paths are coming"
      var position=arrayObjectIndexOfall(redraw_path,id,"to");
      if(arrayObjectIndexOfall(redraw_path,id,"from")!=-1){from_redraw(id,x,y);}
      //to select the from id
      var counter=0;
      for(counter=0;counter<position.length;counter++){
      var from_id=redraw_path[position[counter]].from;
      var from_x=document.getElementsByTagName('svg')[from_id].getAttribute("x");
      var from_y=document.getElementsByTagName('svg')[from_id].getAttribute("y");
      var which_from={left:parseInt(from_x),top:parseInt(from_y)};

      var anchor_obj2=anchorCoordinates(from_id,which_from);
      //2 is for to and 1 is for from
      var element_2 = new Array([anchor_obj1.anchor1_x,anchor_obj1.anchor1_y],[anchor_obj1.anchor2_x,anchor_obj1.anchor2_y],[anchor_obj1.anchor3_x,anchor_obj1.anchor3_y],[anchor_obj1.anchor4_x,anchor_obj1.anchor4_y]);
      var element_1 = new Array([anchor_obj2.anchor1_x,anchor_obj2.anchor1_y],[anchor_obj2.anchor2_x,anchor_obj2.anchor2_y],[anchor_obj2.anchor3_x,anchor_obj2.anchor3_y],[anchor_obj2.anchor4_x,anchor_obj2.anchor4_y]);
      //drawing_instructions(element_1,element_2,from_id,id);
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


      function calculate_distance(a, b) {
      var width  = Math.abs( a[0] - b[0] ),
        height = Math.abs( a[1] - b[1] ),
        hypothenuse = Math.sqrt( width*width + height*height );
      return hypothenuse;
      }
/////////////////////////////
////////////////////////////
var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                        .y(function(d) { return d.y; })
                        .interpolate("step");


  var lineData = [ { "x": closest.a[0],   "y": closest.a[1]},{ "x": closest.b[0],   "y":closest.b[1]}];
  //console.log(position);
  document.getElementById(redraw_path[position[counter]].id).setAttribute("d",lineFunction(lineData));
  //console.log(global_paths[position[counter]].x1);
  //console.log(global_paths[position[counter]].x1=closest.a[0]);
  //global_paths[position[counter]].y2=closest.a[1];
  //global_paths[position[counter]].x2=closest.a[0];
  //global_paths[position[counter]].y2=closest.a[1];
  socket.emit('move',{id:redraw_path[position[counter]].id,d:lineFunction(lineData)});


    }// for loop end
}

///////////////////////////////////// from redrawing
function from_redraw(id,x,y){
//incoming: Id of the element, its x valye, its y value
var which ={left:x,top:y};// creating object
var anchor_obj1=anchorCoordinates(id,which);
//getting all "TO elements to which the paths are coming"
var position=arrayObjectIndexOfall(redraw_path,id,"from");
//to select the from id
var counter=0;
for(counter=0;counter<position.length;counter++){
var to_id=redraw_path[position[counter]].to;
var to_x=document.getElementsByTagName('svg')[to_id].getAttribute("x");
var to_y=document.getElementsByTagName('svg')[to_id].getAttribute("y");
var which_to={left:parseInt(to_x),top:parseInt(to_y)};

var anchor_obj2=anchorCoordinates(to_id,which_to);
//2 is for to and 1 is for from
var element_1 = new Array([anchor_obj1.anchor1_x,anchor_obj1.anchor1_y],[anchor_obj1.anchor2_x,anchor_obj1.anchor2_y],[anchor_obj1.anchor3_x,anchor_obj1.anchor3_y],[anchor_obj1.anchor4_x,anchor_obj1.anchor4_y]);
var element_2 = new Array([anchor_obj2.anchor1_x,anchor_obj2.anchor1_y],[anchor_obj2.anchor2_x,anchor_obj2.anchor2_y],[anchor_obj2.anchor3_x,anchor_obj2.anchor3_y],[anchor_obj2.anchor4_x,anchor_obj2.anchor4_y]);
//drawing_instructions(element_1,element_2,from_id,id);
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


function calculate_distance(a, b) {
var width  = Math.abs( a[0] - b[0] ),
  height = Math.abs( a[1] - b[1] ),
  hypothenuse = Math.sqrt( width*width + height*height );
return hypothenuse;
}
/////////////////////////////
////////////////////////////
var lineFunction = d3.svg.line()
                   .x(function(d) { return d.x; })
                  .y(function(d) { return d.y; })
                  .interpolate("step");


var lineData = [ { "x": closest.a[0],   "y": closest.a[1]},{ "x": closest.b[0],   "y":closest.b[1]}];
//console.log(position);
document.getElementById(redraw_path[position[counter]].id).setAttribute("d",lineFunction(lineData));
//console.log(global_paths[position[counter]].x1);
//console.log(global_paths[position[counter]].x1=closest.a[0]);
//global_paths[position[counter]].y2=closest.a[1];
//global_paths[position[counter]].x2=closest.a[0];
//global_paths[position[counter]].y2=closest.a[1];
socket.emit('move',{id:redraw_path[position[counter]].id,d:lineFunction(lineData)});


}// for loop end
}

//this.drawAggregate = drawAggregate;
