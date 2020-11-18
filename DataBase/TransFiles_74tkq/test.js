const http = require('http');
const url = require('url');
const fs = require('fs')
const path = require('path')

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.ico': 'image/x-icon',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.json': 'application/json',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2'
}

// http.createServer((req, res) => {}).listen(8080)

http.createServer((req, res) => {
	const urlReq = url.parse(req.url, true);

	if (urlReq.path !== '/') {
		const filePath = path.join(process.cwd(), urlReq.path)
		console.log(filePath);
		ext = path.extname(filePath);
		console.log("Тип файла" + mimeTypes[ext])
		if (fs.existsSync(filePath)) {
			console.log('Файл существует!');
			res.writeHead(200, { 'Content-Type': mimeTypes[ext] })
			const fileStream = fs.createReadStream(filePath);
			fileStream.pipe(res);
		}
		else {
			res.writeHead(404, { 'Content-Type': 'text / html' });
			res.end("404 not found");
		}

	}
	else {
		res.writeHead(200, { 'Content-Type': 'text / html' });
		const filePath = path.join(process.cwd(), 'i.html')
		const fileStream = fs.createReadStream(filePath)
		fileStream.pipe(res);
	}

}).listen(8080)

