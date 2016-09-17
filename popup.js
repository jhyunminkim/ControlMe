window.addEventListener("load", TurnOn);
                                                                                           
function TurnOn(){
   var myButton = document.getElementById("id1");
   if(myButton){
   	  console.log("button exists");
      myButton.addEventListener("click", handleClick);
   }
}

function handleClick() {
	console.log("went into handler");
  	chrome.runtime.getBackgroundPage(function(bg) {
	    bg.block = true;
	    bg.beginTime = new Date().getTime();
	});

}