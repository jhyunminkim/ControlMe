window.addEventListener("load", TurnOn);
                                                                                           
function TurnOn(){
   var backgroundPage = chrome.extension.getBackgroundPage();
   if(!backgroundPage.block){
	var myButton = document.createElement("BUTTON");
	myButton.innerHTML = "Turn On";
	myButton.setAttribute("id", "id1");
	document.body.appendChild(myButton);
	myButton.addEventListener("click", handleClick);
   } else{
	var timeLeft = getTimeLeft(backgroundPage.beginTime, backgroundPage.waitTime);
	var timeElement = document.createElement("Div");
	timeElement.innerHTML = timeLeft;
	document.body.appendChild(timeElement);   
   }
}

function handleClick() {
  	var myButton = document.getElementById("id1");
	document.body.removeChild(myButton);
	chrome.runtime.getBackgroundPage(function(bg) {
	    bg.block = true;
	    bg.beginTime = new Date().getTime();
            bg.startListener();
	});

}

function getTimeLeft(beginTime, waitTime){
	var currentTime = new Date().getTime();
	var timePassed = currentTime - beginTime;
	return (waitTime - timePassed);
}
