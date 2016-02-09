var data = [
	{
		"value": 1500
	},
	{
		"value": 300
	}
];

var colors = ["#15317e", "#41a317"];

var width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

var pie = d3.layout.pie()
    .value(function(d) { return d.value; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.datum(data).selectAll("path")
    .data(pie)
  .enter().append("path")
    .attr("fill", function(d, i) { return colors[i]; })
    .attr("d", arc)
    .each(function(d) { this._current = d; }); // store the initial angles

function update(newData) {
  pie.value(function(d) { return d.value; }); // change the value function
  path = svg.datum(newData).selectAll("path").data(pie); // compute the new angles
  path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
}

function type(d) {
  d.apples = +d.apples;
  d.oranges = +d.oranges;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}