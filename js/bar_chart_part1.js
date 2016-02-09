// var div = document.createElement("div");
// div.innerHTML = "Hello, world!";
// document.body.appendChild(div);

// var body = d3.select("body");
// var div = body.append("div");
// div.html("Hello, world!");

// var section = d3.selectAll("section");
// var div = section.append("div");
// div.html("Hello, world!");

// var body = d3.select("body");
// body.style("color", "white");
// body.style("background-color", "black");
// body.html("Hello, world!");

// d3.select("body")
//     .style("color", "white")
//     .style("background-color", "black")
//     .html("Hello, world!");

var data = [4, 8, 15, 16, 23, 42];

var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420]);

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });

// var body = d3.select("body")
// var chart = body.select("chart");
// var bar = chart.selectAll("div");
// var barUpdate = bar.data(data);
// var barEnter = barUpdate.enter().append("div");
// barEnter.style("width", function(d) { return d * 10 + "px"; });
// barEnter.text(function(d) { return d; });