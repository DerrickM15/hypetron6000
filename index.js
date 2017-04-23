const tmi = require('tmi.js');
const express = require('express');
const options = require('./config.json');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('Static'));

app.get('/', function (req, res) {
  res.render('index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


const client = new tmi.client(options);

client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self) return;

    if (userstate['emotes']) {
        let emotesNum = 0;
        USEmotesObj = userstate['emotes'];
        for (let key in USEmotesObj) {
            if (USEmotesObj.hasOwnProperty(key)) {
                emotesNum += USEmotesObj[key].length;
            }
            console.log(emotesNum);
        }
    }
});

// Connect the client to the server..
client.connect();
