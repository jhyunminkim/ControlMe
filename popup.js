window.addEventListener("load", TurnOn);

var backgroundPage = chrome.extension.getBackgroundPage();
var interval;
                                                                                           
function TurnOn(){
   if(!backgroundPage.block){
   	createButton();
   } else{
	createTimeElement();
   }
}

function handleClick() {
    backgroundPage.block = true;
    backgroundPage.beginTime = new Date().getTime();
    backgroundPage.startListener();
    createTimeElement();
}

function getTimeLeft(){
	var beginTime = backgroundPage.beginTime;
	var waitTime = backgroundPage.waitTime;
	var currentTime = new Date().getTime();
	var timePassed = currentTime - beginTime;
	return (waitTime - timePassed);
}


function updateTime() {
	var timeLeft = getTimeLeft();
	var minutes = Math.ceil(timeLeft / 60000);
	var seconds = ((timeLeft % 60000) / 1000).toFixed(0);
	var timeValue = document.getElementById("timeValue");
	var timeText = document.getElementById("timeText");
	if (minutes > 1) {
		timeValue.innerHTML = minutes;
		timeText.innerHTML = "minutes";
	} else {
		timeValue.innerHTML = seconds;
		timeText.innerHTML = "seconds";
	}
	if (timeLeft < 1000) {
		clearInterval(interval);
		createButton();
	}
}

function createButton() {
	var timeElement = document.getElementById("timeElement");
	if (timeElement) {
		document.body.removeChild(timeElement);
	}
	
	var myButton = document.createElement("BUTTON");
	myButton.innerHTML = "Block";
	myButton.setAttribute("id", "id1");
	document.body.appendChild(myButton);
	myButton.addEventListener("click", handleClick);
}

function createTimeElement() {
	var myButton = document.getElementById("id1");
	if (myButton) {
		document.body.removeChild(myButton);
	}

	var timeElement = document.createElement("DIV");
	var timeValue = document.createElement("DIV");	
	var timeText = document.createElement("DIV");

	timeElement.setAttribute("id", "timeElement");
	timeValue.setAttribute("id", "timeValue");
	timeText.setAttribute("id", "timeText");

	timeElement.appendChild(timeValue);
	timeElement.appendChild(timeText);
	document.body.appendChild(timeElement);

	interval = setInterval(updateTime, 1000);
}