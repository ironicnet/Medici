var constructor = function(config) {
	if (!config.tmbdapi) config.tmbdapi = {};
	if (!config.tmbdapi.key) config.tmbdapi.key="";

	var procs = require('child_process');

	var openFiles = {};
	openFile = function(fileStr, callback) {
		//it should return a JSOn with the metadata
		callback(null);
	};

	this.getTitle = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			if (stdout == null) {
				callback(null);
				return;
			}
			//It should return a JSON with the title
			console.log("Could not find Name: in metadata! File: " + fileStr);
			callback(null);
		});
	};

	this.getDuration = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			if (stdout == null) {
				callback(null);
				return;
			}

			//It should return a JSON with the Duration
			callback(null);
			return;
		});
	};

	this.getAlbum = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			if (stdout == null) {
				callback(null);
				return;
			}
			//It should return a JSON with the Album
			callback(null);
			return;
		});
	};

	this.hasCoverArt = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			//error of some kind
			if (stdout == null) {
				console.error("Could not open file with MP4Box!");
				callback(false);
				return;
			}
			//It should return a Boolean indicating if contains Cover Art
			var m = stdout.match(/Cover Art: PNG File/);
			if (m) callback(true);
			else callback(false);
		});
	};

	this.getCover = function(fileStr, callback) {
		//It should download the cover file to disk and return true if succeded
		callback(false);
	};

	this.getTrackNo = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			if (stdout == null) {
				callback(null);
				return;
			}
			//It should return a JSON with the Track number

			callback(null);
			return;
		});
	};
	return this;
}
exports.constructor =constructor;