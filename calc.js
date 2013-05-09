var http = require('http');
var qs = require('querystring');
http.createServer(function (req, res) {
	console.log("[200] " + req.method + " to " + req.url);

    switch(req.url) {
        case '/':
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});

            res.write('<html><head><title>Simple Calculator</title></head><body>');
            res.write('<h1>Its a simple calculator to add 2 number</h1>');
            res.write('<form enctype="application/x-www-form-urlencoded" action="/formhandler" method="post">');
            res.write('Number 1: <input type="text" name="number1" value="" /><br />');
            res.write('Number 2: <input type="text" name="number2" value="" /><br />');
            res.write('<input type="submit" value="Add"/>');
            res.write('</form></body></html');

	        res.end();
            break;
        case '/formhandler':
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.write('<html><head><title>Simple Calculator</title></head><body>');

            var body = "";
            var result = 0;
            if (req.method === "POST" &&
                    req.headers['content-type'] === "application/x-www-form-urlencoded") {

                req.on('data',
                          function(chunk) {
                              // append the chunk to the growing message body
                              body += chunk;
                          });

                req.on('end', function() {
                    var params = body.split('&');

                    for (param in params) {
                        var pair = params[param].split('=');
                        result = result + parseInt(pair[1]);
                    }
                    res.write("Result: " + result);
                    res.write('</body></html');
                    res.end();
                });
            }

            break;
        default:
            res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
            res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
            console.log("[404] " + req.method + " to " + req.url);
    }
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
