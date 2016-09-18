var block = false;
var beginTime = 0;
var waitTime = 30000;

var blockSites = function(details) { 
        if (block == true) {
		return {cancel: true};
	} else {
		return {cancel: false};
	}
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
	
	setTimeout(removeListener, 30000);
}


function removeListener(){
	chrome.webRequest.onBeforeRequest.removeListener(blockSites);
	beginTime = 0;
	block = false;
}	
