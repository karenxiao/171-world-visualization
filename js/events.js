/* **********************************************************
* events.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* changes map and graph based on event
**************************************************************/

var event;
var eventYears = {"1998event": 1998, "2000event": 2000, "2001event": 2001, "2002event": 2002, "2009event": 2009};
var eventDescriptions = {
	"1998event": "<b>1998: Aftermath of the Asian Tiger Crisis</b><br>Asian Tigers are a series of countries in eastern and southeastern Asia who grew economically very quickly through the late 1990s, and then suffered from a financial crisis in 1997. The aftermath for these countries and many close trading partners was that of economic decline.",
	"2000event": "<b>2000: Y2K</b><br>As the decade changed, many countries suffered from economic problems both as a result of the public fear surrounding the change of the millenium. Other issues followed, including those surrounding currency and trading partnerships.",
	"2001event": "<b>2001: Dot-com Bubble</b><br>This bubble burst after significant advancements of the technology industry, where people were valuing the industry above the market value that it was providing, and it caused severe disruption in the US stock market, as well as stock markets of many developed nations or nations who traded heavily with the United States.",
	"2002event": "<b>2002: 9/11 Aftermath</b><br>September 11, 2001, was the date in which two planes were crashed by terrorists into the World Trade Center buildings in New York, New York. Because this is one of the financial centers of the world, the economic effect was devastating and long-lasting, but the aftermath in the year immediately following the attacks was very apparent for the United States and nations with whom it worked very closely.",
	"2009event": "<b>2009: Global Financial Crisis Unraveling</b><br>The Global Financial Crisis was is one of the largest economic crises in the last 70 - 80 years, causing most nations to experience economic downturn as a result. A few nations, such as India and China, who have been developing at exorbitantly high rates for the past five or six years, did not see a decline in GDP, but did see slowed growth. This was the only time from 1995 - 2010 that the United States saw a negative GDP per capita change."
};

$('#select-event').change(function() { eventChange(); });
var events = document.getElementsByName('event');

function eventChange()
{
	state = "filtered";

	$('#graph-config').css('visibility', 'hidden');

	// get event(s) selected
	for (var i = 0, length = events.length; i < length; i++) 
	{
		if (events[i].checked) 
	    {
	      event = events[i].value.toString();
	      renderMap("filtered", event);
	      graph("filtered", "USA", event);
	    }
	}
	document.getElementById('year').value = eventYears[event];
	document.getElementById('year-display').innerHTML = eventYears[event];

	$('#event-descriptions').html(eventDescriptions[event]);
}

function eventClear()
{
	state = "normal";

	$('#graph-config').css('visibility', 'visible')

	renderMap("normal", null);
	for (var i = 0; i < radios.length; i++) 
	{
		radios[i].checked = false;
	}
	document.getElementById('year').value = 1995;
	document.getElementById('year-display').innerHTML = 1995;
	$('#event-descriptions').html("");
}



