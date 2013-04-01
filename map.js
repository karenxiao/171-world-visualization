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

      el: $('#container1'),

      geography_config: 
      { 
        highlightBorderColor: '#EDDC4E',
        highlightFillColor: '#CC4731',
        highlightOnHover: true,
        popupTemplate: _.template('<div class="hoverinfo"> <strong><%= geography.properties.name %></strong> <% if (data.index) { %><hr/>  Education Index: <%= data.index %> <% } %> <% if (data.rank) { %><hr/>  Worldwide Rank: <%= data.rank %> <% } %> </div>')
      },
      
      fills: 
      {
        'high': '#000061',
        'medium': '#306596',
        'low': '#667FAF',
        defaultFill: '#EDDC4E'
      },

      data: output,
    });

   map.render();

