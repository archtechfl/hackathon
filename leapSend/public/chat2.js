window.onload = function() {
    var messages = [];
    var socket = io.connect('169.254.103.228:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    
    var userID = '';
    
//start leap
    
    var frame;

var fieldLeap = document.getElementById("field");
    
//new leap motion controller
var controller = new Leap.Controller({ enableGestures: true });
	
	//render cube, 48 frames per second
	
	//setInterval(render, (1000/48));
	
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
			
			fieldLeap.value = frame;

		  }

    });

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
                console.log(messages[i]);
                console.log(messages[i - 1]);
                
                var result1 = messages[i];
                var result2 = messages[i - 1];
                
                if (result1 == 'rock' && result2 == 'scissors'){
                	console.log('Player 1 wins!');
                }
                */
                
                	//Second comparison attempt
                	if (messages.length >= 3)
                		{
                			var result1 = messages[0];
                			var result2 = messages[1];
                			console.log (result1 + " " + result2);
        			}
                
           	}
            content.innerHTML = html;
       		} 
       		else 
       		{
       			//sessionCompare[userID] = frame;
            console.log("There is a problem:", userID);
        	}
    	});
    sendButton.onclick = function() {
        var leapValue = field.value;
        sessionCompare[userID] = leapValue;
        socket.emit('send', { message: leapValue });
        
        console.log("Messages: " + messages);
        
        console.log(sessionCompare);
    };
    
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
