<script>

var svg = d3.select("body")
    .append("svg")
    .attr("width", 600)
    .attr("height", 500);

var points = [
  [0, 0],
  [110, 500],
  [210, 100],
  [310, 300],
  [410, 50],
  [510, 500],
  [600, 0]
];

var methods = [ //interpolation methods
    'linear',
    'step-before',
    'step-after',
    'basis',
    'basis-open',
    'basis-closed',
    'bundle',
    'cardinal',
    'cardinal-open',
    'cardinal-closed',
    'monotone'
    ];

var method = 0;

var path = svg.append('path')
    .data([points])
    .attr('d', d3.svg.line().interpolate('basis'))
    .attr('stroke-weight', '5px')
    .attr('fill', 'none')
    .attr('class', 'poly')
;
d3.select('button').on('click', function() {
   path.transition().attr('d', d3.svg.line().interpolate(methods[method]));
   d3.select('input').attr('value', methods[method]);
   method++;
   if(method >= methods.length) method = 0;
});

d3.select('input').attr('value', 'basis');
</script>
/*
Interpolation Methods

For more about them head on over to the D3 wiki and look for 'line.interpolate'.

linear – Normal line (jagged).
step-before – stepping graph alternating between vert and horz segments.
step-after - stepping graph alternating between horz and vert segments.
basis - B-spline, with control point duplication on the ends (that's the one above).
basis-open - open B-spline; may not intersect start or end.
basis-closed - closed B-spline with start and the end closed in a loop.
bundle - equivalent to basis, except a separate tension parameter is used to straighten the spline
cardinal - a Cardinal spline, with control point duplication on the ends.
cardinal-open - open cardinal spline; may not intersect start or end, but will intersect other ctrl points
cardinal-closed - a closed Cardinal spline, looped back on itself.
monotone - cubic interpolation that makes the graph only slightly smoother.
*/
