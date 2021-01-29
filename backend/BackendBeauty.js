//libraries
let ArduinoPort = require('serialport');
let WebSocket = require('ws').Server;
let fs = require('fs');

//name CSV file (must have no :,- in)
let pathName = './StoredData/' // where the file will go
var date= new Date().toISOString();
var res1 = date.replace(/:/g, "-");
var res2 = res1.replace(/\./g, "-");
var res3= res2.replace(/Z/g, "");
var fileName= (pathName + "output-" + res3)
//console.log(fileName);

//open port
let portName = process.argv[2]; //usually COM3
var sensorPort = new ArduinoPort(portName, 9600); //set arduino baud rate to 9600

//creating ASCII encoded data
let readLine = ArduinoPort.parsers.Readline; // make instance of Readline parser
let parser = new readLine(); // make a new parser to read ASCII lines
sensorPort.pipe(parser); // pipe the serial stream to the parser

//config websocket
const SERVER_PORT = 1999;               // websocket server port number
let wss = new WebSocket({port: SERVER_PORT}); // the webSocket server
let connections = new Array;          // list of connections to the server

//calling functions
//serial functions
sensorPort.on('open', showPortOpen);
parser.on('data', broadcastAndWrite); //broadcast data and write to CSV
sensorPort.on('close', showPortClose);
sensorPort.on('error', showError);
//web socket function
wss.on('connection', handleConnection);

//functions to check data is being received
//Baud rate and port should be the same as the arduino
function showPortOpen() {
    console.log('port open. Data rate: ' + sensorPort.baudRate);
}

function broadcastAndWrite(data) {
    //console.log(data); //can be used to check data recieved
    // broadcast data to all webSocket clients
    if (connections.length > 0) {
        broadcast(data);
    }
    //writing sensor data to csv file (where is can be stored for later graphing)
   fs.appendFile(fileName, data, function (err) {
       if (err) return console.log(err);
       console.log('data written to file-' + fileName);
   });

}

function showPortClose() {
    console.log('port closed.');
}

function showError(error) {
    console.log('Serial port error: ' + error);
}

//webSocket event listeners
function handleConnection(client) {
    console.log("New Connection"); // new client has connected
    connections.push(client); // add this client to the connections array
    client.on('close', function() { // client has closed their connection
        console.log("connection closed");
        let position = connections.indexOf(client); // get the client's position in the array
        connections.splice(position, 1); // and delete it from the array
    });
}
// broadcasting sensor data to all webSocket clients
function broadcast(data) {
    for (myConnection in connections) {   //  go through the array of connections
        connections[myConnection].send(data); // send data to each connection
    }
}

