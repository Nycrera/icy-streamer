/* jshint node: true */
/*jshint esversion: 6 */
var streamer = function (configuration,callback) {
   var generator = require('./conf_generator.js');
   const {spawn} = require('child_process');

   var fs = require('fs');
   if (typeof (configuration) === 'string') {
      generator.read(configuration, function (data) {
         this.configuration = data;
      });
   } else if(typeof(configuration) == 'object'){
      this.configuration = configuration;
      if (!configurtion.filename) {
         console.log('[WARN]No playlist specified so creating a new one.'); // If no playlist is specified let us create ourselves
         configuration.filename = __dirname+'/playlist.m3u';
         fs.appendFile(configuration.filename, '#EXTM3U\n', function (err) {
            if (err) throw err;
            console.log('[INFO]New playlist file: ' + configuration.filename + ' generated in local directory.');
         });
      }
      if(callback)
      generator.create('ezstream-conf.xml', configuration,callback); // Hard coded for now
      else generator.create('ezstream-conf.xml', configuration);
   }else{
      throw "icy-streamer constructor only takes either an object or a string! But yours is "+typeof(configuration);
   }
   this.running = false;
   var self = this;

   this.addSong = function (filename,callback) {
      if (!self.running) throw "Can't add new song \"" + filename + "\" while stream is not running.";
      if (!fs.existsSync(filename)) throw "No file exists with this path : " + filename;
      fs.appendFile(self.filename, filename + "\n", function (err) {
         if (err) throw err;
         console.log('[INFO]New song: ' + filename + ' added to playlist.');
         self.flushPlayList();
         if(callback) callback();
      });
   };

   this.flushPlayList = function () {
      self.Stream.kill('SIGHUP');
      console.log('[INFO]Flushed the playlist.');
   };
   this.killStream = function () {
      if (!self.running) throw "Tried to stop radio stream while it wasn't running already.";
      self.Stream.kill();
      self.running = false;
      self.Stream = null;
   };
   this.startStream = function () {
     try{
      self.Stream = spawn('ezstream', ['-c', self.configuration.filename]);
      self.Stream.on("exit",function(){
         self.Stream.running = false;
      });
      self.Stream.running = true;
   }catch(error){
       throw error;
   }
   };

};
module.exports = streamer;