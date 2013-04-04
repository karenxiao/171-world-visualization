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
var numCountries = lines.length/numYears;

var data = new Array();
for (var i = 0; i < numCountries-1; i++)
{
    data[i] = new Array();
    data[i]["country"] = lines[i*numYears+1][0];
    data[i]["code"] = lines[i*numYears+1][12];

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
/*
var output = {};
output = {
        "USA": {
            "fillKey": "high",
            "electoralVotes": 5
        },
        "MEX": {
            "fillKey": "low",
            "electoralVotes": 5
        },
        "CAN": {
            "fillKey": "low",
            "electoralVotes": 5
        },
        "AUS": {
            "fillKey": "low",
            "electoralVotes": 5
        }

 };
*/

var output = new Array();
for (var i = 1; i < data.length; i++)
{
    var country = data[i]["code"];
    output[country] = new Array();

    var gdp = data[i][2010]["gdp"];
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
}
