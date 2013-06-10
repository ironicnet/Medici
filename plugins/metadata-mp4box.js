/**
 * Medici
 * Copyright (c) 2012 Kristoffer Andersen
 * All right reserved
 */


var constructor = function(config) {
	if (!config.mp4box) config.mp4box = {};
	if (!config.mp4box.path) config.mp4box.path='';

	var procs = require('child_process');

	var openFiles = {};
	openFile = function(fileStr, callback) {
		if (openFiles[fileStr]) {
			callback(openFiles[fileStr]);
			return;
		}
		procs.exec(config.mp4box.path + "MP4Box -info \"" + fileStr + "\"", function(err, stdout, stderr) {
			if (err !== null) {
				console.log("MP4Box process error: " + err + "\n Input: " + fileStr);
				return callback(null);
			}
			// cache output
			openFiles[fileStr] = stdout;

			return callback(stdout);
		});
	};

	this.getTitle = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			if (stdout == null) {
				callback(null);
				return;
			}

			var m = stdout.match(/iTunes Info:/);
			if (m == null) {
				console.log("No iTunes metadata in: " + fileStr);
				callback(null);
				return;
			}
			m = stdout.match(/Name: (.+)\n/);
			if (m && m[1]) {
				callback(m[1]);
				return;
			}

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
			var m = stdout.match(/ - Duration (\d\d:\d\d:\d\d)/);
			if (m && m[1]) {
				callback(m[1]);
				return;
			}

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
			var m = stdout.match(/Album: (.+)\n/);
			if (m && m[1]) {
				callback(m[1]);
				return;
			}

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
			var m = stdout.match(/Cover Art: PNG File/);
			if (m) callback(true);
			else callback(false);
		});
	};

	this.getCover = function(fileStr, callback) {
		procs.exec(config.mp4box.path + "MP4Box -dump-cover \"" + fileStr + "\"", function(err, stdout, stderr) {
			if (err) {
				console.error("Error on extracting cover art from: " + fileStr);
				console.log(err + ": " + stderr + "\n" + stdout);
				callback(false);
			} else callback(true);
		});
	};

	this.getTrackNo = function(fileStr, callback) {
		openFile(fileStr, function(stdout) {
			if (stdout == null) {
				callback(null);
				return;
			}
			var m = stdout.match(/TrackNumber: (\d+)/);
			if (m && m[1]) {
				callback(m[1]);
				return;
			}

			callback(null);
			return;
		});
	};
	return this;
}
exports.constructor =constructor;