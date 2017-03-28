var tmi = require('tmi.js');
var options = require('./config.json');

var client = new tmi.client(options);

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;
    
    var emotesNum = userstate['emotes'] ? Object.keys(userstate['emotes']).length : 0;
    console.log(emotesNum);
});

// Connect the client to the server..
client.connect();
