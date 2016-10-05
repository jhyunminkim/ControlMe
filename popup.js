window.addEventListener("load", onStart);

// Globals
var backgroundPage = chrome.extension.getBackgroundPage();
var interval; // Need to keep track so can clear later
                                    
// Runs on load                                                     
function onStart(){
	var blockButton = document.getElementById("blockButton");
	var urlInputClick = document.getElementById("urlInputClick");
	var timeInputClick = document.getElementById("timeInputClick");
	blockButton.addEventListener("click", handleBlockClick);
   	urlInputClick.addEventListener("click", handleUrlInput);
   	timeInputClick.addEventListener("click", handleTimeInput);

   	if(!backgroundPage.block){
  		showMainMenu();
   	} else{
		showTimeElement();
   	}
}

function handleBlockClick() {
	if (backgroundPage.chosenUrls.length == 0 || backgroundPage.waitTime <= 0) {
		return;
	}
    backgroundPage.block = true;
    backgroundPage.beginTime = new Date().getTime();
    backgroundPage.startListener();
    showTimeElement();
}

function handleUrlInput() {
	var urlInput = document.getElementById("urlInput").value;
	var urlInputForm = document.getElementById("urlInputForm");
	backgroundPage.chosenUrls.push(urlInput);
	urlInputForm.reset();
}

function handleTimeInput() {
	var timeInput = document.getElementById("timeInput").value;
	var timeInputForm = document.getElementById("timeInputForm");
	var backgroundPage.waitTime = timeInput;
	timeInputForm.reset();
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
		showMainMenu();
	}
}

function showMainMenu() {
	var mainMenu = document.getElementById("mainMenu");
	var timeElement = document.getElementById("timeElement");
	mainMenu.style.display = "block";
	timeElement.style.display = "none";
}

function showTimeElement() {
	var mainMenu = document.getElementById("mainMenu");
	var timeElement = document.getElementById("timeElement");
	mainMenu.style.display = "none";
	timeElement.style.display = "block";

	interval = setInterval(updateTime, 1000);
}