const http = require("http");
const fetch = require('node-fetch');
const host = '172.20.10.10';
const port = 8000;

//----------------------

const admin = require('firebase-admin');
const serviseAccount = require('./FilesForServer/dron-5e28f-firebase-adminsdk-h1zq0-f2d167e764.json');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://dron-5e28f.firebaseio.com"
});
const db = admin.firestore();

//----------------------

const dataBuffer = [];

const SerialPort = require('serialport');
const { resolve } = require("path");
const { rejects } = require("assert");
const { promises } = require("dns");
const Readline = SerialPort.parsers.Readline
const serialPort = new SerialPort("COM3", { baudRate: 9600 })
const parser = new Readline()
serialPort.pipe(parser)
var ar_dt = ''
// тут примает строку по serial port
parser.on('data', (recivedData) => {
    console.log(recivedData)
    ar_dt = recivedData
    // работа с БД
    send_request(ar_dt);
    
})

//----------------------

async function send_request(ar_dt) {
    const adress = `http://172.20.10.5:3000/dron_info$${ar_dt}`;
    console.log("Записал)");
    return fetch(adress);
}
const requestListener = function (req, res) {
    res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
    if (req.url.startsWith('/dron_data')) {
        res.writeHead(200,{'Content-Type':'text / html'});
        console.log("----------OK---------");
        console.log(`data: ${ar_dt}`);
        console.log("----------OK---------");
        res.end(`Dron info ${ar_dt}`);
    }
    else {
        console.log("-------ERROR-------")
        res.end('OOO "БЕЛЫЕ" приветствует вас!');
    }
};

const server = http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`);
});