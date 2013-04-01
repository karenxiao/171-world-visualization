/* **********************************************************
* data.js
*
* CS 171 Project 2 
* Rachna Raina & Karen Xiao
* 
* format data from data.csv in proper style for DataMaps
**************************************************************/

var raw = ""

var lines = raw.split('\n');
for (var i = 0; i < lines.length; i++)
{
	lines[i] = lines[i].split(',');
}

var data = new Array();
for (var i = 1; i < lines.length; i++)
{
	len = lines[i].length;
	data[i] = {};
	for (var j = 0; j < len; j++)
	{
		data[i][lines[0][j]] = lines[i][j];
	}
}

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
        }
 };
/*
var output = {};
for (var i = 1; i < data.length; i++)
{
	//output[data[i]["code"]]["fillKey"] = data[i]["gdp"];
	output[data[i]["code"]]["gdp"] = data[i]["gdp"];
}
*/