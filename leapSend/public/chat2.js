window.onload = function() {
    var messages = [];
    var socket = io.connect('169.254.103.228:3700');
    
    var userID = '';
    
    var leapValue = '';
    
    function throwPrepare(){
    	var throwMessage = document.getElementById("throw");
    	throwMessage.innerHTML = "Prepare to throw";
    	setTimeout(throwIT, 4000);
    }
    
    throwPrepare();
    
//start leap

function throwIT(){
	
var throwMessage = document.getElementById("throw");
throwMessage.innerHTML = "Throw!";	
	
setTimeout(transmit, 2000);
    
var frame;
    
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
				
				/////////////////
				var hand1 = document.getElementById("hand1");
						
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
        	}
    	});
    	
}//end of throw
    	
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
        	console.log(messages);
                console.log ("Result one: " + result1 + " result 2: " + result2);
                
                //***************serve images for states*************
                
                
                
                
                
                
                
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
                
    		//********************************CREATE ELEMENTS FOR DOM ****************************
    	        var player1View = document.createElement("div");
                player1View.setAttribute("id","1");
                var name1 = document.createTextNode("PLAYER 1");
                player1View.appendChild(name1);
                document.body.appendChild(player1View);

                var player2View = document.createElement("div");
                player2View.setAttribute("id","2");
                var name2 = document.createTextNode("PLAYER 2");
                player2View.appendChild(name2);
                document.body.appendChild(player2View);
                //End Div add DOM
                
                
    	
    	
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
