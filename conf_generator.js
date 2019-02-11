var generator = {};
generator.create = function (filename, conf, callback) {
    var fs = require('fs');
    if (!filename || !conf) throw "filename or conf is not specified for the configuration generator.";
    if (!conf.playlist) throw "Playlist conf is mandatory.";
    var xml2js = require('xml2js');
    var builder = new xml2js.Builder();
    var xmlConfig = {
        ezstream: {
            url: conf.url || "http://localhost:8000/stream",
            sourceuser: conf.sourceuser || "source",
            format: conf.format || "MP3",
            sourcepassword: conf.sourcepassword || "hackme",
            filename: conf.filename, // Maybe full path ?
            svrinfoname: conf.svrinfoname || "My Stream",
            svrinfourl: conf.infourl || "",
            svrinfogenre: conf.genre || "RockNRoll",
            svrinfodescription: conf.description || "This is a stream description",
            svrinfobitrate: conf.bitrate || 128,
            svrinfochannels: conf.channels || 2,
            svrinfosamplerate: conf.samplerate || 44100,
            svrinfopublic: conf.public || 0
        }
    };
    fs.writeFile(filename, builder.buildObject(xmlConfig), function (err) {
        if (err) {
            return console.log(err);
        }
        if (callback) callback(xmlConfig);
    });

};

generator.read = function (file, callback) {
    var fs = require('fs');
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    fs.readFile(file, function (err, data) {
        if (err) console.log(err);
        parser.parseString(data, function (err, result) {
            if (err) console.log(err);
            callback(result.ezstream);
        });
    });
};

module.exports = generator;