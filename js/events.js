/* **********************************************************
* events.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* changes map and graph based on event
**************************************************************/

var eventYears = {"1998event": 1998, "2000event": 2000, "2001event": 2001, "2002event": 2002, "2009event": 2009};
$('#select-event').change(function() { eventChange(); });
var radios = document.getElementsByName('event');

function eventChange()
{
	// get event(s) selected
	for (var i = 0, length = radios.length; i < length; i++) 
	{
		if (radios[i].checked) 
	    {
	      var event = radios[i].value.toString();
	      renderMap("filtered", event);
	    }
	}
	document.getElementById('year').value = eventYears[event];
	document.getElementById('year-display').innerHTML = eventYears[event];
}

function eventClear()
{
	renderMap("normal", null);
	for (var i = 0; i < radios.length; i++) 
	{
		radios[i].checked = false;
	}
	document.getElementById('year').value = 1995;
	document.getElementById('year-display').innerHTML = 1995;
}