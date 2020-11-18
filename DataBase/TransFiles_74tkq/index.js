const http = require('http');
const url = require('url');

const html = `
<html lang="ru">

<head>
	<meta http-equiv="Content-type" content="text/html; charset=UTF-8" />
	<title></title>
	<link rel="stylesheet" href="style.css">
</head>

<body>
	<img src="img.jpg">
	<button id="b" onclick="f()">Нажми на меня</button>
	<script src="app.js"></script>
</body>



</html>`

const css = `
button {
	background-color: grey;
}`

const js = `
let check = true; 
function f() {
	check = !check;
	btn = document.getElementById('b');
	if (check) {
		btn.style.backgroundColor = "#e8793e";
	}
	else {
		btn.style.backgroundColor = "#800000"
	}
}
`
http.createServer((req, res) => {
	let URLRequest = url.parse(req.url, true)
	console.log(URLRequest.query)
	console.log(req.url);
	if (req.url == "/") {
		res.writeHead(200, { 'Content-Type': 'text / html' });
		res.end(html);

	}

	else if (req.url === "/style.css") {
		res.writeHead(200, { 'Content-Type': 'text / css' });
		res.end(css);
	}
	else if (req.url == '/app.js') {
		res.writeHead(200, { 'Content-Type': 'text / javascript' });
		res.end(js);
	}
	else if (req.url == '/img.jpg') {
		res.writeHead(200, { 'Content-Type': 'text/' })
	}
	else {
		res.writeHead(404, { 'Content-Type': 'text / html' });
		res.end("404 не найдено");
	}
}).listen(8000, () => console.log("server is work"))

//req.metog!!! GET or POST



