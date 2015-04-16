// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var lastwords = require('./lastwords.json');

function tweetLastWords(tweet) {
	T.post('statuses/update', { status: tweet }, function(err, data, response) {
		console.log(err);
		console.log(data);
	});
}

function getLastWord(){
	var lastword = {};
	while(Object.keys(lastword).length < 3){
		var randomnumber=Math.floor(Math.random()*lastwords.length)
		lastword = lastwords[randomnumber];	
	}
	var offender = lastword["Offender:"];
	offender = offender.replace(/#\d*/, '').replace(/^\s+|\s+$/g, '');
	return 'On ' + lastword['Date of Execution:'].replace(/^\s+|\s+$/g, '') + ' ' + offender + ' had these last words: "' + lastword['Last Statement:'].replace(/^\s+|\s+$/g, ''); + '"';
}
	

function breakDownString(str, len){
	var returnArray = []
	if(str.length <= len){
		return [str]
	}
	while(str.length >len){
		var tmpString = str.substring(0,len);
		if(tmpString.lastIndexOf(' ') <= 0){
			returnArray.push(str.substring(0,len) + "...");
			str = str.substring(len);
		} else {
			returnArray.push(str.substring(0,tmpString.lastIndexOf(' ')) + "...");
			str = str.substring(tmpString.lastIndexOf(' '));
		}
	}
	returnArray.push(str);
	return returnArray;
}

function go(){
	var tweetAsArray = breakDownString(getLastWord(), 137);
	for (var i = tweetAsArray.length - 1; i >= 0; i--) {
		tweetLastWords(tweetAsArray[i]);
	};
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
// setInterval(go(), 60000 * 60 * 24);
go();





