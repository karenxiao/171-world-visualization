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
var output = generateOutput(1995);

/***********************
* generatePoints()
* generates data points for country selected
************************/
function generatePoints(country)
{
	var points = new Array();
	for (var year = 0; year < numYears; year++)
	{
		output = generateOutput(1995+year);

		actualYear = 1995+year;
		points[year] = {"year": d3.time.format("%Y").parse(actualYear.toString()), "gdp": output[country]["gdp"]};
	} 
	return points;
}

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
	var country1 = document.getElementById("country1").value;
	var country2 = document.getElementById("country2").value; 
	if (country1 == '' || country2 == '')
	{
		return;
	}

	var points1 = generatePoints(country1);
	var points2 = generatePoints(country2);

	// render title
	document.getElementById('graph-title').innerHTML = "GDP per capita: " + output[country1]["name"] + ', ' + output[country2]["name"];
	document.getElementById('legend-graph').style.visibility = 'visible';

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

	  x.domain(d3.extent(points1, function(d) { return d["year"]; }));
	  y.domain([900, 50000]);

	  svg.append("g")
	      .attr("class", "axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("GDP per capita (USD)");

	  svg.append("path")
	      .datum(points1)
	      .attr("class", "line1")
	      .attr("d", line);

	  svg.append("path")
	      .datum(points2)
	      .attr("class", "line2")
	      .attr("d", line);

}