# icy-streamer

icy-streamer is a nodejs controller for the famous icecast source client known as ezstream.
Using icy-streamer you can add new songs to your currently playing stream. So you can dynamically change your next music to play.

Just wrap this around a express REST API and you have a REST API controlled icecast live stream.
The reason this module created was to be able to create a live internet radio controlled by the LISTENERS!

#### Requirements
  - [Icecast Server](http://icecast.org/)
  - [Ezstream](http://icecast.org/ezstream/)
  - Node.js (obviously)

#### Some Examples and Notes // Work in Progress
```js
var streamConfig = {
      url: "http://localhost:8000/stream",
      sourceuser: "source",
      format: "MP3",
      sourcepassword: "hackme",
};
var liveStream = require('icy-streamer')(streamConfig);
liveStream.addSong("/home/songs/coolsong.mp3",function(){
  console.log("Added new song yaya!");
  liveStream.startStream(); // Ok let's start the stream!
  setTimeout(function(){
    if(liveStream.Stream.running){ // You can check using this property.
      liveStream.addSong("/home/songs/anothercoolsong.mp3"); // Added another song you can stop if you want using liveStream.killStream() or it will end itself anyway.
    }
  },2000); // After 2 second let us add another song. Of course you will call this somewhere else. Just be sure stream did not end.
  
});

```

### Installation

Just simple stuff.
Just be sure you have already installed ezstream and icecast.
```sh
$ npm install icy-streamer
```

### Todos
 - Examples and Notes
 - Tests
 - Detailed Documentation
 - Some features that i forgot right now but probably will remember soon.

License
----

MIT


**Free Software <3 !**