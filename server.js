

// Should add error handling to allow for this to run even if server is already started and then just exit gracefully
var express = require('express');
//var fallback = require('express-history-api-fallback');
//var serveStatic = require('serve-static');
var path = require('path');


var app = express();
app.use(express.static(path.join(__dirname, "./node_modules")));
app.use('/src', express.static(path.join(__dirname, "./src")));
app.use('/src/css', express.static(path.join(__dirname, "./src/css")));
app.use('/img', express.static(path.join(__dirname, "./img")));

app.get('/index.html', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(9000);

console.log('Server listening on port 9000');