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
$('#select-filter').change(function() { graph(currentCountry); });
var graphLabels = {"gdp": "GDP per capita (USD)", "unemployment": "Unemployment Rate", "population": "Population"};
/***********************
* generatePoints()
* generates data points for country selected
************************/
function generatePoints(country, filter)
{
  var points = new Array();
  for (var i = 0; i < numYears; i++)
  {
    var output = generateOutput(1995+i);

    year = 1995+i;
    points[i] = {"year": d3.time.format("%Y").parse(year.toString()), "yearnum": i, "gdp": output[country]["gdp"], "unemployment": output[country]["unemployment"], "population": output[country]["population"]};
  } 
  return points;
}

/***********************
* graph()
* renders line graph from data
************************/

function graph(state, country, event)
{
  child = document.getElementById('graph-child');
  graphElement.removeChild(child);
  var newChild = document.createElement('graph-child');
  graphElement.appendChild(newChild);
  newChild.id = "graph-child"

  // get year selected
  var selectedYear = document.getElementById('year').value;
  selectedYear = d3.time.format("%Y").parse(selectedYear.toString());

  // get filter selected
  var radios = document.getElementsByName('filter');
  for (var i = 0, length = radios.length; i < length; i++) 
  {
      if (radios[i].checked) 
      {
        var filter = radios[i].value.toString();
      }
  }

  var points = generatePoints(country, filter);

  // render graph
  var margin = {top: 20, right: 20, bottom: 20, left: 80},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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

  x.domain(d3.extent(points, function(d) { return d["year"]; }));
  y.domain(d3.extent(points, function(d) { return d[filter]; }));

  var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  var svg = d3.select("#graph-child").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
      .attr("class", "axis")
      .attr("stroke-width", 1)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
        .attr("class", "axis")
        .attr("stroke-width", 1)
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(graphLabels[filter]);

  // populate data
  if (state == "normal")
  {
    var output = generateOutput(selectedYear);
    var countryName = output[country]["name"]
    document.getElementById('graph-title').innerHTML = "Data from years 1995-2010: " + countryName;
    drawLine(points, filter, svg, div, x, y, countryName);
  }
  else if (state == "filtered")
  {
    output = generateFilteredOutput(year, event);
    
  }
  
    // svg.selectAll("circle")
    //   .data(points)
    //   .enter()
    //   .append("circle")
    //   .attr("cx", function(d) { return x(d["year"]); })
    //   .attr("cy", function(d) { return y(d[filter]); })
    //   .attr("r", 5)
    //   .on("click", function(d) { displayEvent(d["year"]); });

}

function drawLine(points, filter, svg, div, x, y, countryName)
{

  var line = d3.svg.line()
    .x(function(d) { return x(d["year"]); })
    .y(function(d) { return y(d[filter]); });

  svg.append("path")
    .datum(points)
    .attr("class", "line")
    .attr("d", line)
    .on("mouseover", function(d) {      
      div.style("opacity", .9);      
      div.html(countryName)  
         .style("left", (d3.event.pageX) + "px")     
         .style("top", (d3.event.pageY - 28) + "px");    
      })                  
    .on("mouseout", function(d) {       
      div.style("opacity", 0);
      }) 
}

// function displayEvent(year)
// {
//   return;
// }


