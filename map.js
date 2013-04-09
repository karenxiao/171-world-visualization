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

/***********************
* renderMap()
* renders map from data
************************/
function renderMap()
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
  document.getElementById('map-title').innerHTML = 'Global GDP per capita and Unemployment Data: ' + year;
  document.getElementById('legend-map').style.visibility = 'visible';
  
  //render map
  var map = new Map(
  {
      scope: 'world',

      el: $('#child'),

      geography_config: 
      { 
        highlightBorderColor: '#1C1CFF',
        highlightFillColor: '#3B63F3',
        highlightOnHover: true,
        popupTemplate: _.template('<div class="hoverinfo"> <strong><%= geography.properties.name %></strong> <% if (data.gdp) { %><hr/>  GDP per capita (USD): <%= data.gdp %> <% } %> <% if (data.unemployment) { %><hr/>  Unemployment Rate: <%= data.unemployment %> <% } %> </div>')
      },
      
      fills: 
      {
        'one': '#FFEBD6',
        'two': '#F5CBAE',
        'three': '#EBA988',
        'four': '#DF8365',
        'five': '#B44E3A',
        'six': '#515151',
        defaultFill: '#515151'
      },

      data: generateOutput(year),
    });

  map.render();
}

