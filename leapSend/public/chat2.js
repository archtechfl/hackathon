window.onload = function() {
    var messages = [];
    var socket = io.connect('169.254.103.228:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    
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
           		}
            content.innerHTML = html;
       		} 
       		else 
       		{
            console.log("There is a problem:", data);
        	}
    	});
    sendButton.onclick = function() {
        var text = field.value;
        socket.emit('send', { message: text });
    };
    var sessionCompare = {};
    io.on('connect', function () 
    	{
    		console.log(this.socket.sessionid);
    	});
    
}
