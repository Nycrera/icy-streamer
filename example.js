// Icecast stream configurations in a basic manner
var streamConfig = {
    url: "http://localhost:8000/stream",
    sourceuser: "source",
    format: "MP3",
    sourcepassword: "icecastpass"
};
var liveStream = require('icy-streamer')(streamConfig);

var express = require('express');
var app = express();

var resource = "/root/source/";

app.get('/start', function (req, res) {
    try {
            liveStream.startStream(); // Ok let's start the stream!
        res.send('Ok!');
    } catch (e) {
        res.send('Server Error!' + e);
        console.error(e);
    }
});


app.get('/add/:songName', function (req, res) {
    try {
        liveStream.addSong(resource + req.params.songName + ".mp3", function () {
            console.log("Added new song yaya!");
        });
        res.send('Ok!');
    } catch (e) {
        res.send('Server Error! ' + e);
        console.error(e);
    }
});


var server = app.listen(8089, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Radio app listening at http://%s:%s", host, port);
});