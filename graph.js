/* **********************************************************
* graph.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* creates a line graph using D3
**************************************************************/

var graphstate = 'off';

var graphElement = document.getElementById('graph');
var child = document.getElementById('grpah-child');


/***********************
* graph()
* renders line graph from data
************************/

function graph()
{

child = document.getElementById('graph-child');
graphElement.removeChild(child);
var newChild = document.createElement('graph-child');
graphElement.appendChild(newChild);
newChild.id = "graph-child"

// get graph data
var points = new Array();
for (var year = 0; year < numYears; year++)
{
	var country = document.getElementById("country").value;
	var output = generateOutput(1995+year);

	actualYear = 1995+year;
	points[year] = [actualYear, output[country]["gdp"]];
	console.log(points[year]);
}    

// render graph
var margin = {top: 20, right: 10, bottom: 30, left: 50},
    width = 300 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var parseDate = d3.time.format("%y").parse;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

var svg = d3.select("#graph-child").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(points, function(d) { return d[0]; }));
  y.domain(d3.extent(points, function(d) { return d[1]; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GDP per capita");

  svg.append("path")
      .datum(points)
      .attr("class", "line")
      .attr("d", line);

}