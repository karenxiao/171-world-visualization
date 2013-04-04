/* **********************************************************
* map.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* implements an interactive world map using the DataMaps add-on
**************************************************************/
  
  var map = new Map(
  {
      scope: 'world',

      el: $('#map'),

      geography_config: 
      { 
        highlightBorderColor: '#EDDC4E',
        highlightFillColor: '#CC4731',
        highlightOnHover: true,
        popupTemplate: _.template('<div class="hoverinfo"> <strong><%= geography.properties.name %></strong> <% if (data.gdp) { %><hr/>  GDP per capita: <%= data.gdp %> <% } %> <% if (data.unemployment) { %><hr/>  Unemployment Rate: <%= data.unemployment %> <% } %> </div>')
      },
      
      fills: 
      {
        'one': '#F0C2E0',
        'two': '#E699CC',
        'three': '#DB70B8',
        'four': '#D147A3',
        'five': '#B82E8A',
        'six': '#8F246B',
        defaultFill: '#EDDC4E'
      },

      data: output,
    });

   map.render();

