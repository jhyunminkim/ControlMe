var block = false;
var beginTime = 0;

chrome.webRequest.onBeforeRequest.addListener(
	function(details) { 
		if (block == true) {
			return {cancel: true};
		} else {
			return {cancel: false};
		}
	},
	{urls: ["*://*.facebook.com/*",
			"*://*.reddit.com/*"
			]
	},
	["blocking"]
);