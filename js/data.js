/* **********************************************************
* data.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* format data from data.csv in proper style for DataMaps
**************************************************************/

var raw = document.getElementById('data').value;
var lines = raw.split('\n');
for (var i = 0; i < lines.length; i++)
{
	lines[i] = lines[i].split(',');
}

var numYears = 16;
var numCountries = 40;

var data = new Array();
for (var i = 0; i < numCountries; i++)
{
    data[i] = new Array();
    data[i]["country"] = lines[i*numYears+1][0];
    data[i]["code"] = lines[i*numYears+1][12];
    data[i]["gdp"] = lines[i*numYears+1][2];
    data[i]["unemployment"] = lines[i*numYears+1][3];

    for (var year = 0; year < numYears; year++)
    {
        data[i][1995+year] = new Array();
        for (var j = 2; j < lines[0].length-1; j++)
        {
            var key = lines[0][j];
            var value = lines[i*numYears+year+1][j];
            data[i][1995+year][key] = value;
        }
    }
}

/**********************
* generateOutput()
* formats output data 
************************/
function generateOutput(selectedYear)
{
	var output = new Array();
	for (var i = 0; i < data.length; i++)
	{
	    var country = data[i]["code"];
	    output[country] = new Array();
	    var gdp = data[i][selectedYear]["gdp"];

	    if (gdp < 10000)
	    {
	        output[country].fillKey = "one";    
	    }
	    else if (gdp >= 10000 && gdp < 20000)
	    {
	        output[country].fillKey = "two";
	    }
	    else if (gdp >= 20000 && gdp < 30000)
	    {
	        output[country].fillKey = "three";
	    }
	    else if (gdp >= 30000 && gdp < 40000)
	    {
	        output[country].fillKey = "four";
	    }
	    else if (gdp >= 40000)
	    {
	        output[country].fillKey = "five";
	    }
	    else 
	    {
	        output[country].fillKey = "six";
	    }
	    
	    output[country]["gdp"] = gdp;
	    output[country]["name"] = data[i]["country"];
	    output[country]["unemployment"] = data[i][selectedYear]["unemployment"];
	    output[country]["unemployment"] = data[i][selectedYear]["unemployment"];
	}
	return output;
}