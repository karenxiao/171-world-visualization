/* **********************************************************
* graph.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* creates a line graph using D3
**************************************************************/

var state = "normal";
var graphElement = document.getElementById('graph');
var child = document.getElementById('graph-child');
var graphLabels = {"gdp": "GDP per capita (USD)", "unemployment": "Unemployment Rate (%)"};
var colors = {'one': '#EFEBD6','two': '#F5CBAE','three': '#EBA988','four': '#E08465','five': '#D65D45','six': '#CC3527','seven': '#640A0A'};

$('#select-filter').change(function() {
  if (state == "filtered") 
  {
    graph("filtered", currentCountry, event);     
  }
  else 
  {
    graph("normal", currentCountry, event);
  }
});


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
    points[i] = {"year": d3.time.format("%Y").parse(year.toString()), "gdp": output[country]["gdp"], "unemployment": output[country]["unemployment"]};
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
  formattedYear = d3.time.format("%Y").parse(selectedYear.toString());

  // get filter selected
  var radios = document.getElementsByName('filter');
  for (var i = 0, length = radios.length; i < length; i++) 
  {
      if (radios[i].checked) 
      {
        filter = radios[i].value.toString();
      }
  }

  if (state == "filtered")
  {
    filter = "gdp";
  }
  
  var points = generatePoints(country, filter);

  $("#graph-warning").html("");

  if (isNaN(points[0][filter]))
  {
    $("#graph-warning").html("Missing data. Please select another country.");
  }

  // render graph
  var margin = {top: 20, right: 20, bottom: 40, left: 80},
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

  if (state == "filtered")
  {
    x.domain(d3.extent(points, function(d) { return d["year"]; }));
    y.domain([100, 40000]);
  }

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

  // draw lines
  if (state == "normal")
  {
    var output = generateOutput(selectedYear);
    name = output[country]["name"];
    color =  output[country]["fillKey"]
    document.getElementById('graph-title').innerHTML = "Data from years 1995-2010: " + name;
    drawLine(points, filter, svg, div, x, y, name, color);
  }
  else if (state == "filtered")
  {
    x.domain(d3.extent(points, function(d) { return d["year"]; }));
    y.domain([100, 110000]);

    var output = generateFilteredOutput(selectedYear, event);
    for (country in output)
    {
      name = output[country]["name"];
      color = output[country]["fillKey"];
      document.getElementById('graph-title').innerHTML = "Data from years 1995-2010";
      points = generatePoints(country, filter);
      drawLine(points, filter, svg, div, x, y, name, color);
    } 
  }
}

function drawLine(points, filter, svg, div, x, y, name, color)
{

  var line = d3.svg.line()
    .x(function(d) { return x(d["year"]); })
    .y(function(d) { return y(d[filter]); });

  svg.append("path")
    .datum(points)
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", colors[color])
    .on("mouseover", function(d) {      
      div.style("opacity", .9);      
      div.html(name)  
         .style("left", (d3.event.pageX) + "px")     
         .style("top", (d3.event.pageY - 28) + "px");    
      })                  
    .on("mouseout", function(d) {       
      div.style("opacity", 0);
      }) 
}


