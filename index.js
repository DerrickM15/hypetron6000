var tmi = require('tmi.js');
var options = require('./config.json');

var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('Static'));



app.get('/', function (req, res) {
  res.render('index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})


var client = new tmi.client(options);

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    
    var emotesNum = userstate['emotes'] ? Object.keys(userstate['emotes']).length : 0;
    console.log(emotesNum);
});

// Connect the client to the server..
client.connect();
