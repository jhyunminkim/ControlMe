var block = false;
var beginTime = 0;
var waitTime = 120000;

var blockSites = function(details) { 
	return {cancel: true};
}
function startListener(){
         chrome.webRequest.onBeforeRequest.addListener(
		blockSites,
		{urls: ["*://*.facebook.com/*",
				"*://*.reddit.com/*"
				]
		},
		["blocking"]
	);
	
	setTimeout(removeListener, waitTime);
}


function removeListener(){
	chrome.webRequest.onBeforeRequest.removeListener(blockSites);
	beginTime = 0;
	block = false;
}	
