/* **********************************************************
* map.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* implements an interactive world map using the DataMaps add-on
**************************************************************/

var state = 'off';

var mapElement = document.getElementById('map');
var child = document.getElementById('child');

if (state == 'off')
{
  child.innerHTML = 'To begin, select a year to display the visualization.';
}

/***********************
* renderMap()
* renders map from data
************************/
function renderMap()
{  
  state = 'on';
  child = document.getElementById('child');
  mapElement.removeChild(child);
  var newChild = document.createElement('child');
  mapElement.appendChild(newChild);
  newChild.id = "child"

  var year = document.getElementById('year').value;
  document.getElementById('map-title').innerHTML = "Global GDP and Unemployment Data: " + year;
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
        popupTemplate: _.template('<div class="hoverinfo"> <strong><%= geography.properties.name %></strong> <% if (data.gdp) { %><hr/>  GDP per capita: <%= data.gdp %> <% } %> <% if (data.unemployment) { %><hr/>  Unemployment Rate: <%= data.unemployment %> <% } %> </div>')
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

