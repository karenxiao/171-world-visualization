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

function displayText()
{
  var description = 'This map is a visualization of global GDP trends over time. We hoped to be able to observed, primarily within OECD nations, the trend of GDP concentrations over the 15 years from 1995 - 2010. The value of this trend understanding comes from being able to see which nations have developed more rapidly comparatively, and if there are concentrations of development amongst any of these nations. The color progression visually highlights the progression, from the lightest (lowest GDP per capita), to darkest (highest GDP per capita).';
  var string = 'To begin, choose a year.'
  child.innerHTML = description + '<br/><br/>' + string;
}
displayText();

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
    displayGraphText();
    return;
  }
  document.getElementById('map-title').innerHTML = "Global GDP per capita and Unemployment Data: " + year;
  
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

