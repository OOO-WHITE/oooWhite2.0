const http = require('http');
const url = require('url');
const { inflate } = require('zlib');
const { tes } = require('./data_work');
let func = require('./data_work');
var active_bd = false;
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`;
http.createServer(async (req, res) => {
    console.log(req.url);
    if (req.url === "/") {
		res.writeHead(200, { 'Content-Type': 'text / html' });
		res.end("<h1>Sorry</h1>");

    }
    else if (req.url.startsWith('/init')) {
        if (active_bd) {
            res.end("<a>Data bese has been already activeted</a>");
        }
        else {
            func.tes();
            active_bd = true;
            res.end("<a>Data base has been activated</a>")
        }
    }
    else if (req.url.startsWith('/create_order')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.writeHead(200, { 'Content-Type': 'text / javascript' });
        data = req.url.split('$');
        data.splice(0,1);
        data = data[0].split('&');
        console.log(data);
        // res.end("<a>I have gotten your request !!!</a>");
        if (data.length >= 4) {
            func.create_order(data[0], data[1], data[2], data[3]); // mail, tel, dron, order
            res.end("<a>New order has been succesfully created</a>");
        }
        else {
            res.end("<a>Incorrect arguments (mail, tel, dron, order)</a>"); 
        }
    }
    else if (req.url.startsWith('/get_order_info')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.writeHead(200, { 'Content-Type': 'text' });
        data = req.url.split('$');
        // data.splice(0,1);
        // data = data[0].split('&');
        // console.log(data);
        order = await func.order_info(data[1]);
        console.log(order);
        res.end(`${order.Client_e_mail}&${order.Client_tel}&${order.Client_dron}&${order.Client_order}`);
    }
    else if (req.url.startsWith('/create_user')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.writeHead(200, { 'Content-Type': 'text / javascript' });
        data = req.url.split('$');
        data.splice(0,1);
        data = data[0].split('&');
        console.log(data);
        if (data.length >= 4) {
            func.create_user(data[0], data[1], data[2], data[3]); // name, login, password, role
            res.end("<a>New user has been succesfully created</a>");
        }
        else {
            res.end("<a>Incorrect arguments (name, login, password, role)</a>"); 
        }
    }
    else if (req.url.startsWith('/get_user_info')){
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.writeHead(200, { 'Content-Type': 'text' });
        data = req.url.split('$'); // get login
        user = await func.user_info(data[1]);
        res.end(`${user.Name}&${user.Login}&${user.Password}&${user.Role}`);
    }
    else if (req.url.startsWith('/dron_info')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.writeHead(200, { 'Content-Type': 'text / html' });
        data = req.url.split('$');
        data.splice(0, 1);
        data = data[0].split('&');
        func.dron_data(data[0], data[1], data[2]);
        res.end("<h5>Data has been saved, try later</h5>");
    }
    else if (req.url.startsWith('/get_dron_info')) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        res.writeHead(200, { 'Content-Type': 'text' });
        data = await func.dron_info('F-1');
        res.end(`${data.par1}&${data.par2}&${data.par3}`)
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text / html' });
        res.end("404 not found");
    }
}).listen(3000, "172.20.10.5"); //"192.168.43.24"