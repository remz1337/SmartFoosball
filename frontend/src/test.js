import Paho from 'paho-mqtt';

var client;

// Called after form input is processed
function startConnect() {
    // Generate a random client ID
    var clientID = "clientID-" + parseInt(Math.random() * 100);

    console.log("debug1");

    // Fetch the hostname/IP address and port number from the form
    var host = "127.0.0.1";//document.getElementById("host").value;
    var port = "1884";//document.getElementById("port").value;

    // Print output for the user in the messages div
    //document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    //document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Initialize new Paho client connection
    client = new Paho.Client(host, Number(port), clientID);

    console.log("debug2");

    // Set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    console.log("debug3");

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
    });

    console.log("debug4");
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form
    var topic = "testy";//document.getElementById("topic").value;

    console.log("debug5");

    // Print output for the user in the messages div
    //document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Subscribe to the requested topic
    client.subscribe(topic);

    console.log("debug6");
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost: " + responseObject.errorMessage);
    }
}

// Called when a message arrives
function onMessageArrived(message) {

    console.log("debug7");

    console.log("onMessageArrived, Topic: " + message.destinationName);
    console.log("onMessageArrived, Payload: " + message.payloadString);
    //document.getElementById("messages").innerHTML += '<span>Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>';
    //updateScroll(); // Scroll to bottom of window
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    //document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    //updateScroll(); // Scroll to bottom of window
}

// Updates #messages div to auto-scroll
/*function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}*/

export default startConnect;