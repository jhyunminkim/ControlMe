var block = false;
var beginTime = 0;
var waitTime = 30000;
var chosenUrls = [];

var blockSites = function(details) { 
	return {cancel: true};
}
function startListener(){
	blockedUrls = []
	for (var i = 0; i < chosenUrls.length; i++) {
		var tempUrl = "*://*." + chosenUrls[i] + "/*";
		blockedUrls.push(tempUrl);
	}
    chrome.webRequest.onBeforeRequest.addListener(
		blockSites,
		{urls: blockedUrls},
		["blocking"]
	);
	setTimeout(removeListener, waitTime);
}


function removeListener(){
	chrome.webRequest.onBeforeRequest.removeListener(blockSites);
	beginTime = 0;
	block = false;
}	
