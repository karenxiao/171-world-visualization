/* **********************************************************
* graph.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* creates a line graph using D3
**************************************************************/

var graphElement = document.getElementById('graph');
var child = document.getElementById('graph-child');

function displayGraphText()
{
	var description = 'In contrast, the graph displayed above is intended to allow for comparisons within a particular nation of GDP per capita trends domestically over time.';
	var string = 'To begin, choose a country.'
	child.innerHTML = description + '<br/><br/>' + string;
}
displayGraphText();

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
var country = document.getElementById("country").value;
if (country == '')
{
	displayGraphText();
	return;
}

var points = new Array();
for (var year = 0; year < numYears; year++)
{
	var output = generateOutput(1995+year);

	actualYear = 1995+year;
	points[year] = {"year": d3.time.format("%Y").parse(actualYear.toString()), "gdp": output[country]["gdp"]};
}    

// render title
document.getElementById('graph-title').innerHTML = "GDP per capita from years 1995-2010: " + output[country]["name"];

// render graph
var margin = {top: 20, right: 40, bottom: 50, left: 80},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
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
    .x(function(d) { return x(d["year"]); })
    .y(function(d) { return y(d["gdp"]); });

var svg = d3.select("#graph-child").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(points, function(d) { return d["year"]; }));
  y.domain(d3.extent(points, function(d) { return d["gdp"]; }));
/*
console.log(d3.extent(points, function(d) { return d["gdp"]; }));
console.log(d3.max(points));
console.log(d3.min(points));
*/

  svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "yaxis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("GDP per capita (USD)");

  svg.append("path")
      .datum(points)
      .attr("class", "line")
      .attr("d", line);

}