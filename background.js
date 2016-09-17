chrome.webRequest.onBeforeRequest.addListener(
	function(details) { return {cancel: true}; },
	{urls: ["*://*.facebook.com/*",
			"*://*.reddit.com/*"
			]
	},
	["blocking"]
);

function TurnOn(){
   var myButton = document.getElementByID("Button1");
   document.removeChild(myButton);

}

