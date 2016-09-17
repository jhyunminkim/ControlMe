window.addEventListener("load", TurnOn);                                                                                           
function TurnOn(){
   var myButton = document.getElementById("id1");
   if(myButton){
      myButton.addEventListener("click", function(){
	   document.body.removeChild(myButton);
      });
   }
}

 
