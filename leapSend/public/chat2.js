window.onload = function() {
    var messages = [];
    var socket = io.connect('169.254.103.228:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    
    var userID = '';
    
    var leapValue = '';
    
    setTimeout(transmit, 10000);
    
//start leap
    
    var frame;

var fieldLeap = document.getElementById("field");
    
//new leap motion controller
var controller = new Leap.Controller({ enableGestures: true });
	
	//Leap collecting loop

    	controller.on( 'frame' , function( data )
    	
    	{
      
      		//Capture data
      		frame = data;
	  
	  		//Cycle through coordinates of finger tip
	  		for(var index = 0; index < frame.pointables.length; index++)
	  		
	  		{
	 
				var pointable = frame.pointables[index];
				
				//Conver tip position to cube position
				xPos = pointable.tipPosition[0];
					
				console.log(frame.hands);
				//console.log(xPos);
				
				fieldLeap.value = frame
				
				/////////////////
				var hand1 = document.getElementById("hand1");
				//var rock = document.getElementsByClassName("rock");
				//var paper = document.getElementsByClassName("paper");
				//var scissors = document.getElementsByClassName("scissors");
						
				if (frame.fingers.length == 2) {
					console.log("scissors");
					hand1.className="scissors";
					leapValue = 'scissors';
							
				} else if (frame.fingers.length == 5) {
					console.log("paper");
					hand1.className="paper";
					leapValue = 'paper';
				
				} else if (frame.fingers.length == 0 && frame.hands.length == 1) {
					console.log("rock");
					hand1.className="rock";
					leapValue = 'rock';
				
				} else if (frame.hands.length == 0){
					console.log("where did you go? please don't leave me!");
					leapValue = 'wheredidyougo?';
					
				} else if (frame.hands.length == 2) {
					console.log("MORTAL KOMBAT");
					hand1.className="mortalKombat";
					leapValue = 'mortalKombat';
					
				} else if (frame.hands.length == 3) {
					hand1.className="hollander";
					leapValue = 'hollander';
					
				}	
				/////////////////

			  }//end of for loop

    });//end of controller

    controller.connect();

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
        //var leapValue = field.value;
        sessionCompare[userID] = leapValue;
        socket.emit('send', { message: leapValue });
        
        console.log("Messages: " + messages);
        
        console.log(sessionCompare);
        
	setTimeout (compare, 3000);
        
    };
    
    function compare() {
    	
    		var result1 = messages[0];
        	var result2 = messages[1];
                console.log ("Result one: " + result1 + " result 2: " + result2);
                
                if (result1 == 'scissors' && result2 == 'rock'){
                	console.log("Player 2 wins! Rock beats scissors");
                } else if (result1 == 'scissors' && result2 == 'paper'){
                	console.log("Player 1 wins! Scissors beats paper");
                } else if (result1 == 'scissors' && result2 == 'scissors'){
                	console.log("Tie!");
                } else if (result1 == 'paper' && result2 == 'scissors'){
                	console.log("Player 2: scissors wins!");
                } else if (result1 == 'paper' && result2 == 'rock'){
                	console.log("Player 1: paper wins!");
                } else if (result1 == 'paper' && result2 == 'paper'){
                	console.log("Tie!");
                } else if (result1 == 'rock' && result2 == 'paper'){
                	console.log("Player 2: paper wins!");
                } else if (result1 == 'rock' && result2 == 'scissors'){
                	console.log("player 1: rock wins!");
                } else {
                	console.log("Tie!");
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
