/* **********************************************************
* events.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* changes map and graph based on event
**************************************************************/

$('#select-event').change(function() { eventChange(); });

function eventChange()
{

	// get event(s) selected
	var radios = document.getElementsByName('event');
	for (var i = 0, length = radios.length; i < length; i++) 
	{
		if (radios[i].checked) 
	    {
	      var filter = radios[i].value.toString();
	    }
	}
}