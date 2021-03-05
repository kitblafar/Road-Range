//libraries
let ArduinoPort = require('serialport');
let WebSocket = require('ws').Server;
let fs = require('fs');
var pad = require('array-pad');
//for web request
let http = require('http');
let url = require('url');
let path = require('path');
let _ = require('underscore');


let startTime = Date.now();

//name CSV file (must have no :,- in)
let pathName = './StoredData/' // where the file will go
var date = new Date().toISOString();
var res1 = date.replace(/:/g, "-");
var res2 = res1.replace(/\./g, "-");
var res3 = res2.replace(/Z/g, "");
var fileName = (pathName + "output-" + res3 + ".csv")
//console.log(fileName);

//open port
let portName = process.argv[2]; //usually COM3
var sensorPort = new ArduinoPort(portName, 9600); //set arduino baud rate to 9600

//creating ASCII encoded data
let readLine = ArduinoPort.parsers.Readline; // make instance of Readline parser
let parser = new readLine(); // make a new parser to read ASCII lines
sensorPort.pipe(parser); // pipe the serial stream to the parser

//config websocket
const SERVER_PORT = 4200;               // websocket server port number
let wss = new WebSocket({port: SERVER_PORT}); // the webSocket server
let connections = new Array;          // list of connections to the server

//serial functions

//reading functions
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
    //Use the bellow function to write data directly to CSV file (but will use drag and drop instead)
    /* let CSVData = `${Date.now() - startTime},${data}`
    //writing sensor data to csv file (where is can be stored for later graphing)
    fs.appendFile(fileName, CSVData, function (err) {
        if (err) return console.log(err);
        //console.log('data written to file-' + fileName);
    });
    */


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
    //writing functions when a new address comes down the websocket
    client.on('message', message => {
        let beforeSplit=message;

        let IPAddressSplit=beforeSplit.split('.');
        let IPAddressArray=[];
        let IPAddressUnjoined=[];
        //if does not take up three values then pad with zeros
        IPAddressUnjoined[0]=pad(IPAddressSplit[0].split(''),-3, 0);
        IPAddressArray[0]=IPAddressUnjoined[0].join('');
        sensorPort.write(IPAddressArray[0], (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written: '+IPAddressArray[0]);
        });
        IPAddressUnjoined[1]=pad(IPAddressSplit[1].split(''),-3, 0);
        IPAddressArray[1]=IPAddressUnjoined[1].join('');
        sensorPort.write(IPAddressArray[1], (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written: '+IPAddressArray[1]);
        });
        IPAddressUnjoined[2]=pad(IPAddressSplit[2].split(''),-3, 0);
        IPAddressArray[2]=IPAddressUnjoined[2].join('');
        sensorPort.write(IPAddressArray[2], (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written: '+IPAddressArray[2]);
        });
        IPAddressUnjoined[3]=pad(IPAddressSplit[3].split(''),-3, 0);
        IPAddressArray[3]=IPAddressUnjoined[3].join('');
        sensorPort.write(IPAddressArray[3], (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written: '+IPAddressArray[3]);
        });

    });
}

// broadcasting sensor data to all webSocket clients
function broadcast(data) {
    for (myConnection in connections) {   //  go through the array of connections
        connections[myConnection].send(data); // send data to each connection
    }
}

//headers to prevent CORS error
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000, // 30 days
    "Content-Type": 'text/csv'
};
//creating the server
http.createServer(function (req, res) {
    if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
    }
    fs.readFile(__dirname + "/DataGoesHere/Test_Data.csv", function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200, headers);
        res.end(data);
        console.log(data);
    });
}).listen(2000);

/*
//Returns the most recent file when names with current time
//find the newest data file N.B. Return only base file name without dir
function getMostRecentFileName(dir) {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, function (f) {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}
 */
