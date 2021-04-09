// UON MEng Group Project
// Backend
//  Includes: >Reading serial data from arduino and sending to websocket (IP address sent down websocket)
//  >A web server on port 2000 that handles: Authorization, saving data and IP Address Sharing
//  >Another port on port 2021 that handles: Data Acquisition

//For password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
const originalHash='$2b$10$kc8A1aRIH55etUYM5SHXk.L4iZdkwlwGFuzGnYa.e.IbVJoFR3ajq';


//libraries
let ArduinoPort = require('serialport');
let WebSocket = require('ws').Server;
let fs = require('fs');

//for web request
let http = require('http');
let base64 = require('base-64');

//name CSV file (must have no :,- in)
let pathName = '/StoredData/' // where the file will go
const date = new Date().toISOString();
const res1 = date.replace(/:/g, "-");
const res2 = res1.replace(/\./g, "-");
const res3 = res2.replace(/Z/g, "");
const fileName = (pathName + "output-" + res3 + ".csv");
//console.log(fileName);

//open port
let portName = process.argv[2]; //usually COM3
let sensorPort = new ArduinoPort(portName, 9600); //set arduino baud rate to 9600

//creating ASCII encoded data
let readLine = ArduinoPort.parsers.Readline; // make instance of Readline parser
let parser = new readLine(); // make a new parser to read ASCII lines
sensorPort.pipe(parser); // pipe the serial stream to the parser

//config websocket for live data
const SERVER_PORT = 4200;               // websocket server live port number
let wss = new WebSocket({port: SERVER_PORT}); // the WebSocket server
let connections = new Array;          // list of connections to the server

//Serial Functions
//reading functions
sensorPort.on('open', showPortOpen);
parser.on('data', broadcastData);
sensorPort.on('close', showPortClose);
sensorPort.on('error', showError);

//web socket function
wss.on('connection', handleConnection);

//functions to check data is being received
//Baud rate and port should be the same as the arduino
function showPortOpen() {
    console.log('port open. Data rate: ' + sensorPort.baudRate);
}

function broadcastData(data) {
    // broadcast data to all webSocket clients
    if (connections.length > 0) {
        broadcast(data);
    }
}

// broadcasting sensor data to all webSocket clients
function broadcast(data) {
    for (myConnection in connections) {   //  go through the array of connections
        connections[myConnection].send(data); // send data to each connection
    }
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
    client.on('close', function () { // client has closed their connection
        console.log("connection closed");
        let position = connections.indexOf(client); // get the client's position in the array
        connections.splice(position, 1); // and delete it from the array
    });
}

//Set up HTTP server
//headers to prevent CORS error
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": 'text/csv'
};
//creating the server for messages
http.createServer(function (req, res) {
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }
    //if this is telling that data needs to be saved
    if (req.headers.authorization==='save'){
        res.writeHead(200, headers);
            console.log("saving");
            //copying current car data to csv file (where is can be stored for later graphing)
            fs.copyFile(__dirname + "/DataGoesHere/CarData.csv", __dirname + fileName, (err) => {
                if (err) throw err;
                console.log('File was copied to destination');
            });
            res.end("saved");
            return;
        }

    //check the password hash
    if(req.headers.authorization.length!=="save"){
        res.writeHead(200, headers);
        let plainPassword=req.headers.authorization;
        bcrypt.compare(plainPassword, originalHash, function(err, result) {
            if(result===true){
                res.end("true");
                console.log("Authorized")
            }
            else{
                res.end("false")

            }
        });

    }
    else if (req.headers.hosting.length>1) {
        res.writeHead(200, headers);
        let IPAddress = req.headers.hosting;
        console.log(IPAddress);
        // sensorPort.write(IPAddress, (err) => {
        //     if (err) {
        //         return console.log('Error on write: ', err.message);
        //     }
        // });
        res.writeHead(200, headers);
        res.end("refresh");
    }

}).listen(2000);

http.createServer(function (req, res) {
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }
    fs.readFile(__dirname + "/DataGoesHere/CarData.csv", function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, headers);
        res.end(data);
        console.log(data);
    });
    console.log('nothing');
}).listen(2021);
