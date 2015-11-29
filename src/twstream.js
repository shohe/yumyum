// var util = require('util');

var twitter = require('ntwitter');
var twit = new twitter({
  consumer_key: 'qdQGDb97sTCJIDKFAOkByxOBS',
  consumer_secret: 'iX2xbmY3skcr8P3U3Xn9msVdU8FvOI5mqiNyPj4YFZbYDSH3q3',
  access_token_key: '4292646147-wF79TR9fwfWsVv6Npue05cqvzp2oAmwEdZk8Sxd',
  access_token_secret: 'NbZ7R9E7BnlYWnZyJ4aVAFWg4Mg6WTZ9PgzaeLtdHZ51R'
});

var keyword = process.argv[2]; //第一引数
var option = {'track': keyword};
console.log(keyword+'を含むツイートを取得します。');

var fs = require('fs');
var app = require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('picture.php'));
}).listen(3000);

var io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
    socket.on('msg', function(data) {
        io.sockets.emit('msg', data);
    });
});

twit.stream('statuses/filter', option, function(stream) {
    stream.on('data', function (data) {
        io.sockets.emit('msg', data.text);
    });
});
