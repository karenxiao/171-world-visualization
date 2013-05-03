/* **********************************************************
* map.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* implements an interactive world map using the DataMaps add-on
**************************************************************/

var mapElement = document.getElementById('map');
var child = document.getElementById('child');
var currentCountry = "USA";

/***********************
* renderMap()
* renders map from data
************************/
function renderMap(state, event)
{  
  // create element to hold map
  child = document.getElementById('child');
  mapElement.removeChild(child);
  var newChild = document.createElement('child');
  mapElement.appendChild(newChild);
  newChild.id = "child"

  var year = document.getElementById('year').value;
  if (year == '')
  {
    return;
  }
  document.getElementById('year-display').innerHTML = year;
  document.getElementById('map-title').innerHTML = 'Global GDP per capita and Unemployment Data: ' + year;
  document.getElementById('legend-map').style.visibility = 'visible';
  
  var processedData;
  // populate data
  if (state == "normal")
  {
    processedData = generateOutput(year);
  }
  else if (state == "filtered")
  {
    processedData = generateFilteredOutput(year, event);
  }

  //render map
  var map = $('#child').datamap(
  {
    scope: 'world',

    geography_config: 
    { 
      highlightBorderColor: '#1C1CFF',
      highlightFillColor: '#3B63F3',
      highlightOnHover: true,
      popupTemplate: _.template('<div class="hoverinfo"> <strong><%= geography.properties.name %></strong> <% if (data.gdp) { %><hr/>  GDP per capita (USD): <%= data.gdp %> <% } %> <% if (data.unemployment) { %><hr/>  Unemployment Rate: <%= data.unemployment %> <% } %></div>')
    },
    
    fills: 
    {
      'one': '#EFEBD6',
      'two': '#F5CBAE',
      'three': '#EBA988',
      'four': '#E08465',
      'five': '#D65D45',
      'six': '#CC3527',
      'seven': '#640A0A',
      defaultFill: '#515151'
    },

    data: processedData,
  });


  map.$el.bind("map-click", function(e, data) {
    // data.data corresponds to the items you passed into the data param
    // data.geography corresponds to the item in the geography json.
    currentCountry = data.geography.id;
    graph("normal", currentCountry);
  });

  map.$el.bind("map-mouseover", function(e, data) {
    if (data.data.name == undefined || data.data.hoverevent == "")
    {
      $("#event-country-descriptions").html("");
    }
    else
    {
      $("#event-country-descriptions").html("<b>Role of: " + data.data.name + "</b><br>" + data.data.hoverevent);
    }
  });

  map.$el.bind("map-mouseout", function(e, data) {
    $("#event-country-descriptions").html("");
  });

}

