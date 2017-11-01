console.log('this is loaded');


var Spotify = require('node-spotify-api');
var Twitter = require("twitter");

var twitterKeys = new Twitter ({
  consumer_key: 'fLQ0mUyiViAkYcfDJTD57MMRZ',
  consumer_secret: '5VPBboNMN3oY21vNdrybUXXFHfpys9xaAQUgdFaSckvxHEwFx8',

  access_token_key: '923324294561779712-rfLBZgi7DcMwK8MFcLZkPdXfUIpyGqD',
  access_token_secret: 'HWln2iDpBla0jTJyQmhel2IqBFjMNIPFNOd8xKF4xwxqc',
});

 
var spotify = new Spotify({
  id: '6bcef24ae7f8416a8215f446231907b1',
  secret: 'e065d9642fa24b6196e6732da7a6ef42'
});
 
 
module.exports = { 
	spotify:spotify,
	twitterKeys:twitterKeys
}