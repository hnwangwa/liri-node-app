var keys = require('./keys.js');
var request = require('request');
var Twitter = require('twitter');
var client = keys.twitterKeys
var spotifyClient = keys.spotify;
var fs = require('fs');
var random = require('./random.txt');


var command = process.argv[2];
var input = process.argv[3];
var extraInput = process.argv[4];

function myTweets() {
	var params = {
	  screen_name: 'codishgambino'
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error){
	    for (var i = 0; i < tweets.length; i++){
	      console.log('Tweet ' + tweets[i].text + '\n' + 'Created at: ' + tweets[i].created_at)
	    }
	  }
	});
}

function spotifyThisSong () {
	if (input != null){
		spotifyClient.search({ type: 'track', query: input }, function(err, data) {
	  		if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
	  	console.log(	data.tracks.items[0].album.name, 
	  					data.tracks.items[0].artists[0].name, 
	  					data.tracks.items[0].uri);
		});
	} else {
		console.log("enter a song pls");
	}
}

function omdbapi(movieTitle){
	request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
	  if (!error && response.statusCode === 200) {
	  // console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	  console.log(JSON.parse(body).Title);
	  console.log(JSON.parse(body).Year);
	  console.log(JSON.parse(body).imdbRating);
	  console.log(JSON.parse(body).Ratings[1]);
	  console.log(JSON.parse(body).Country);
	  console.log(JSON.parse(body).Language);
	  console.log(JSON.parse(body).Plot);
	  console.log(JSON.parse(body).Actors);
	  }
	});
}

function doWhatItSays(cat, dog) {
	spotifyClient.search({ type: dog, query: cat }, function(err, data) {
	  	if (err) {
	    	return console.log('Error occurred: ' + err);
	  	}
	  	console.log(	data.tracks.items[0].album.name, 
	  					data.tracks.items[0].artists[0].name, 
	  					data.tracks.items[0].uri
	  				);
	});
}

if (command === "spotify"){
	spotifyThisSong();
} else if (command === "twitter"){
	myTweets();
} else if (command === "omd-bapi"){
	if (input != null ){
		if (extraInput != null){
			console.log("please enter quotes around your movie title");
		} else {
			var movieTitleNoSpace = input.split(' ').join('+');
			omdbapi(movieTitleNoSpace);
		}
	} else {
		console.log("please enter a movie");
	}
} else {
	fs.readFile("random.txt", "utf8", function(error, data) {
	  if (error) {
	    return console.log(error);
	  }
	  console.log(data);
	  doWhatItSays(data, "track");
	});
}


