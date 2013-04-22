/* **********************************************************
* unemployment.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* creates a line graph comparing GDP and Unemployment using D3
**************************************************************/

var unemploymentElement = document.getElementById('unemployment');
var child = document.getElementById('unemployment-child');

/***********************
* generateData()
* generates gdp data for country selected
************************/
function generateData()
{
  var unemploymentData = new Array();
  for (var i = 0; i < numCountries; i++)
  {
    if (data[i]["gdp"] == "" || data[i]["unemployment"] == "")
    {
      unemploymentData[i] = {"country": data[i]["country"], "gdp": 0, "unemployment": 0};
    }
    else
    {
      unemploymentData[i] = {"country": data[i]["country"], "gdp": data[i]["gdp"], "unemployment": data[i]["unemployment"]};
    }
  }

  return unemploymentData;
}

/***********************
* graphUnemployment()
* renders line graph from data
************************/
/*
  // get graph data
  var country1 = document.getElementById("country1").value;
  var country2 = document.getElementById("country2").value; 
  if (country1 == '' || country2 == '')
  {
    graphState = 'off';
    return;
  }

  // get year selected
  var selectedYear = document.getElementById('year').value;
  var output = generateOutput(selectedYear);
  selectedYear = d3.time.format("%Y").parse(selectedYear.toString());
*/

  var points = generateData;

  // render graph
  var margin = {top: 20, right: 40, bottom: 50, left: 80},
      width = 1000 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

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

  var svg = d3.select("#unemployment-child").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //x.domain(d3.extent(points, function(d) { return d["unemployment"]; }));
    //y.domain(d3.extent(points, function(d) { return d["gdp"]; }));

    x.domain([0,30]);
    y.domain([900, 50000]);

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
        .text("GDP per capita (USD)");

    svg.selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", function(d) {return d["unemployment"];})
      .attr("cy", function(d) {return d["gdp"];})
      .attr("r", 5);

