// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var lastwords = require('./lastwords.json');

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
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
		// console.log(tmpString.lastIndexOf(' '));
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
	// console.log(tweetAsArray);
	for (var i = 0; i < tweetAsArray.length; i++) {
		// console.log(tweetAsArray[i])
		tweetLastWords(tweetAsArray[i]);
	};
}

// setInterval(tweetLastWords, 10000);
go();





