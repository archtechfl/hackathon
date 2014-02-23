window.onload = function() {
    var messages = [];
    var socket = io.connect('169.254.103.228:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    
    var userID = '';
    
    // Store frame for motion functions
    var previousFrame = null;
    var paused = false;
    var pauseOnGesture = false;
    // Setup Leap loop with frame callback function
    var controllerOptions = {enableGestures: true};
    Leap.loop(controllerOptions, function(frame) {
      if (paused) {
        return; // Skip this update
      }
      // Display Frame object data
      var frameOutput = document.getElementById("frameData");
      var frameString = "Frame ID: " + frame.id  + "<br />"
                      + "Timestamp: " + frame.timestamp + " &micro;s<br />"
                      + "Hands: " + frame.hands.length + "<br />"
                      + "Fingers: " + frame.fingers.length + "<br />"
                      + "Tools: " + frame.tools.length + "<br />"
                      + "Gestures: " + frame.gestures.length + "<br />";
     // frameOutput.innerHTML = "<div style='width:300px; float:left; padding:5px'>" + frameString + "</div>";
     
      // Display Gesture object data
     // var gestureOutput = document.getElementById("gestureData");
      var gestureString = "";
      if (frame.hands.length > 0) {
          console.log("Hands more than one");
        if (pauseOnGesture) {
            console.log("pause on gesture");
          togglePause();
          // output = document.getElementById("output").innerHTML = frame.fingers.length;
        }
        for (var i = 0; i < frame.gestures.length; i++) {
            console.log("Frame gestures");
          var gesture = frame.gestures[i];
          gestureString += "Gesture ID: " + gesture.id + ", "
                        + "type: " + gesture.type + ", "
                        + "state: " + gesture.state + ", "
                        + "hand IDs: " + gesture.handIds.join(", ") + ", "
                        + "pointable IDs: " + gesture.pointableIds.join(", ") + ", "
                        + "duration: " + gesture.duration + " &micro;s, ";
        }
      }
      else {
        gestureString += "No gestures";
      }
      //gestureOutput.innerHTML = gestureString;
      
      // Store frame for motion functions
      previousFrame = frame;
      
      var rock = frame.fingers.length == 0;
       var paper = frame.fingers.length == 5;
        var scissors = frame.fingers.length == 2;
      
      
        if (output == 0) {
            //console.log("rock");
            var player1 = "rock";
                    console.log(player1 + " this is rock");
        } else if(output > 1 && output <= 3) {
            //console.log("scissors");
            var player1 = "scissors";
                    console.log(player1 + " this is scissors");
        } else if (output >=4) {
            //console.log("paper");
            var player1 = "paper";
            console.log(player1 + " this is paper" );
        }
      
        
        /*
        var player2 = "scissors";
        
    if (player1 == "scissors" && player2 == "scissors"){
        console.log("Tie");
    } else if (player1 =="scissors" && player2 == "rock"){
        console.log("Lose");
    } else if (player1 =="scissors" && player2 == "paper"){
        console.log("Win");
    } else if (player1 =="rock" && player2 == "rock"){
        console.log("tie");
    } else if (player1 =="rock" && player2 == "scissors"){
        console.log("win");
    } else if (player1 =="rock" && player2 == "paper"){
        console.log("lose");
    } else if (player1 =="paper" && player2 == "paper"){
        console.log("tie");
    } else if (player1 =="paper" && player2 == "rock"){
        console.log("win");
    } else if (player1 =="paper" && player2 == "scissors"){
        console.log("lose");
    }
    
    */
        
        
        
      
    })
    
    var my_controller = new Leap.Controller({enableGestures: true});
      my_controller.on('connect', function(){
        setInterval(function(){
          var frame = my_controller.frame();
        }, 500);
      });
      my_controller.connect();
      console.log(my_controller);
      
      /*
    function vectorToString(vector, digits) {
      if (typeof digits === "undefined") {
        digits = 1;
      }
      return "(" + vector[0].toFixed(digits) + ", "
                 + vector[1].toFixed(digits) + ", "
                 + vector[2].toFixed(digits) + ")";
    }
    */
    
    // OHHHHHH RIGHTT HEREEEEEE
    // -----------------------------------------
    function togglePause() {
      paused = !paused;
      if (paused) {
        //document.getElementById("pause").innerText = "Resume";
            console.log("resume");
      } else {
        //document.getElementById("pause").innerText = "Pause";
        console.log("paused");
      }
    }
    
    function pauseForGestures() {
      if (document.getElementById("pauseOnGesture")) {
        pauseOnGesture = true;
      } else {
        pauseOnGesture = false;
      }
    }
    
    var myVar;
    function myFunction()
    {
    myVar=setTimeout(function(){console.log("Hello")},3000);
    }
    clearTimeout(myVar);
    
//end leap controller
 
    socket.on('message', function (data) {
        if(data.message) 
        	{
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) 
            	{
                html += messages[i] + '<br />';
                
                /*
                var result1 = messages[0];
                var result2 = messages[1];
                console.log (result1 + " " + result2);
                */
      
                /*
                console.log(messages[i]);
                console.log(messages[i - 1]);
                
                var result1 = messages[i];
                var result2 = messages[i - 1];
                
                if (result1 == 'rock' && result2 == 'scissors'){
                	console.log('Player 1 wins!');
                }
                */
                
                	/*
                	//Second comparison attempt
                	if (messages.length >= 3)
                		{
                			var result1 = messages[0];
                			var result2 = messages[1];
                			console.log (result1 + " " + result2);
        			}
        		*/
                
           	}
            content.innerHTML = html;
       		} 
       		else 
       		{
       			//sessionCompare[userID] = frame;
            console.log("There is a problem:", userID);
        	}
    	});
    	
    function transmit() {
        var leapValue = field.value;
        sessionCompare[userID] = leapValue;
        socket.emit('send', { message: leapValue });
        
        console.log("Messages: " + messages);
        
        console.log(sessionCompare);
        
	setTimeout (compare, 3000);
        
    };
    
    function compare() {
    	
    	var result1 = parseInt(messages[0]);
        	var result2 = parseInt(messages[1]);
                console.log (result1 + " " + result2);
                
                if (result1 > result2) {
                	console.log("wooooooooooooooooooo!");
                } else {
                	console.log("booooooooooooooooooo!");
                }
    	
    }
    
    //Creating users and storing info
    var sessionCompare = {};//holder
    
    socket.on('connect', function () 
    	{
    	
    		userID = this.socket.sessionid;
    		sessionCompare[userID] = '';
    		//console.log(this.socket.sessionid);
    		
    		console.log(sessionCompare);
    
    	});
    
}
